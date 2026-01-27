package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/vendrya/markethub/internal/helpers"
	"github.com/vendrya/markethub/internal/modules/products/dto"
	"github.com/vendrya/markethub/internal/modules/products/service"
)

type ProductController struct {
	productService *service.ProductService
}

func NewProductsController(productService *service.ProductService) *ProductController {
	return &ProductController{productService: productService}
}

func (c *ProductController) GetAllProducts(ctx *gin.Context) {
	products, err := c.productService.FindAllProducts()
	if err != nil {
		helpers.CreateResponse(ctx, http.StatusBadRequest, "Bad request", nil, err.Error())
		return
	}

	helpers.CreateResponse(ctx, http.StatusOK, "All products", products, nil)
}

func (c *ProductController) CreateProduct(ctx *gin.Context) {
	userIDValue, _ := ctx.Get("userID")
	fmt.Println(userIDValue)

	var req dto.CreateProductRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		helpers.CreateResponse(ctx, http.StatusBadRequest, "Bad request", nil, err.Error())
		return
	}

	userIDStr, _ := userIDValue.(string)
	userID, _ := uuid.Parse(userIDStr)

	err := c.productService.CreateProduct(req, userID)
	if err != nil {
		helpers.CreateResponse(ctx, http.StatusBadRequest, "Bad request", nil, err.Error())
		return
	}

	helpers.CreateResponse(ctx, http.StatusCreated, "Product created", nil, nil)
}
