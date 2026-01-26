package service

import (
	"errors"

	"github.com/vendrya/markethub/internal/modules/products/models"
	"github.com/vendrya/markethub/internal/modules/products/repository"
)

type ProductService struct {
	productRepo *repository.ProductRepository
}

func NewProductService(pRepo *repository.ProductRepository) *ProductService {
	return &ProductService{
		productRepo: pRepo,
	}
}

func (s *ProductService) FindAllProducts() ([]models.Product, error) {
	products, err := s.productRepo.FindAllProducts()
	if err != nil {
		return nil, errors.New("Error to find products")
	}

	return products, nil
}
