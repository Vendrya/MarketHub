package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vendrya/markethub/internal/helpers"
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
