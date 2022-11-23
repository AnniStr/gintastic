/**
 * @swagger
 * components:
 *  schemas:
 *    Gin:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *          description: The gin's name.
 *        type:
 *          type: string
 *          description: Type of the gin.
 *        alcohol_content:
 *          type: number
 *          format: float
 *          minLength: 3
 *          maxLength: 3
 *          description: Alcohole percentage of the gin.
 *        origin_country:
 *          type: string
 *          description: origin country of the gin.
 *        origin_city:
 *          type: string
 *          description: origin city of the gin.
 *        botanicals:
 *          type: string
 *          description: Botanicals of the gin.
 *        main_notes:
 *          type: string
 *          items:
 *            type: string
 *          description: Main notes of the gin.
 *        description:
 *          type: string
 *          description: Description or story of the gin.
 *        is_public:
 *          type: boolean
 *          description: True if the gin is/should be shown in the public list.
 *        is_tipp:
 *          type: boolean
 *          description: True if the admins marked the gin as tipp.
 */