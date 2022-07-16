import * as yup from "yup";
import * as express from "express";
import { connect } from "../services/google";
import { badRequest, ResultWithStatusCode } from "../toolsServices/ErrorService";
import * as searchService from "../toolsServices/SearchService";
import * as memberService from "../services/members";
import { Creneau, CreneauNames, MemberSummary } from "../entities/members";
import { AllYears as AllYears } from "../entities/memberSheets";

/** GetMembersFilter - swagger
 * @swagger
 * components:
 *    schemas:
 *      GetMembersFilter:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  example: "wedding dress"
 *              drawer:
 *                  type: string
 *                  enum: ["coats_jackets","tops","bottoms","one_piece","shoes","bags","other"]
 *                  example: "one_piece"
 *              category:
 *                  type: string
 *                  enum: ["bags","blazers","cardigans_and_shrugs","coats","dresses","footwear","jackets","jeans","jewellery","jumpsuits","outerwear","pants","rompers","shorts","skirts","sweaters","sweatshirts","tops"]
 *                  example: "dresses"
 *              color:
 *                  type: string
 *                  enum: ["neutral","black","dark_grey","light_grey","white","off_white","chocolate","brown","camel","beige","burgundy","dark_red","red","coral","orange","mustard","yellow","light_yellow","purple","fuschia","pink","light_pink","rosewood","lilac","navy","blue","light_blue","turquoise","duck_blue","dark_green","green","olive","light_green","khaki","jean","gold","silver"]
 *                  example: "purple"
 *              oneOfLabels:
 *                  type: array
 *                  items:
 *                    type: string
 *                  example: ["dress","wedding","purple"]
 *              allLabels:
 *                  type: array
 *                  items:
 *                    type: string
 *                  example: ["dress","wedding","purple"]
 */
const GetMembersFilterSchema = yup
    .object({
        firstname: yup.string(),
        lastname: yup.string(),
        birth: yup.string().matches(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/), // no date !
        creneau: yup.mixed<Creneau>().oneOf(Object.values(CreneauNames)),
    })
    .noUnknown(true)
    .strict();

/** MemberOrderKeySchema - swagger
 * @swagger
 * components:
 *    schemas:
 *      MemberOrderKeySchema:
 *         type: string
 *         enum: ["createdAt", "title", "category", "drawer", "color", "properties", "labels", "chosenCount"]
 *         example: "category"
 */
const MemberOrderKeySchema = yup.mixed<memberService.MemberOrderbyKeys>().oneOf(Object.values(memberService.MemberOrderbyKeysNames));
/** MemberOrderBy - swagger
 * @swagger
 * components:
 *    schemas:
 *      MemberOrderBy:
 *          type: object
 *          properties:
 *              key:
 *                  $ref: '#components/schemas/MemberOrderKeySchema'
 *              order:
 *                  $ref: '#components/schemas/SortOrderSchema'
 */
const MemberOrderBySchema = yup.array().of(
    yup
        .object({
            key: MemberOrderKeySchema.required(),
            order: searchService.SortOrderSchema.required(),
        })
        .noUnknown(true)
);

export const searchMembersInputSchema = yup
    .object({
        filters: GetMembersFilterSchema.notRequired(),
        pagination: searchService.PaginationInputSchema.notRequired().strict(true), // strict true is important it allow to be undefined while pagination.pagIndex is required. Else we get a default value.
        orderby: MemberOrderBySchema.notRequired(),
        year: yup.mixed<AllYears>().oneOf(Object.values(AllYears)),
    })
    .noUnknown(true);

export const search = async (req: express.Request): Promise<ResultWithStatusCode<searchService.PaginatedResponse<MemberSummary>>> => {
    console.log("controller req.params.year : " + req.params.year);
    const { filters, pagination, orderby } = searchService.parseFiltersInQuery(req); // might throw badRequest
    let year;

    try {
        year = req.params.year ? (req.params.year as AllYears) : undefined;
    } catch (e) {
        throw badRequest("validation.invalid", null, { invalid: "year" });
    }
    const input = await searchMembersInputSchema.validate({ filters, pagination, orderby, year }, { stripUnknown: true, abortEarly: false });

    console.log("member filter " + JSON.stringify(input, null, 2));

    const client = connect();

    return { statusCode: 200, result: await memberService.getMembersCurrentYear(client, input, year) };
};
