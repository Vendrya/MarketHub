package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vendrya/markethub/internal/helpers"
	"github.com/vendrya/markethub/internal/modules/auth/dto"
	"github.com/vendrya/markethub/internal/modules/auth/service"
)

type AuthController struct {
	authService *service.AuthService
}

func NewAuthController(authService *service.AuthService) *AuthController {
	return &AuthController{authService: authService}
}

func (c *AuthController) Register(ctx *gin.Context) {
	var req dto.RegisterRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		helpers.CreateResponse(ctx, http.StatusBadRequest, "Bad request", nil, err.Error())
		return
	}

	res, err := c.authService.Register(req)
	if err != nil {
		helpers.CreateResponse(ctx, http.StatusBadRequest, "Bad request", nil, err.Error())
		return
	}

	helpers.CreateResponse(ctx, http.StatusCreated, "Register!!", res, nil)
}

func (c *AuthController) Login(ctx *gin.Context) {
	var req dto.LoginRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		helpers.CreateResponse(ctx, http.StatusBadRequest, "Bad request", nil, err.Error())
		return
	}

	res, err := c.authService.Login(req)
	if err != nil {
		helpers.CreateResponse(ctx, http.StatusUnauthorized, "Unauthorized", nil, "Invalid credentials")
		return
	}

	helpers.CreateResponse(ctx, http.StatusOK, "Login!!", res, nil)
}
