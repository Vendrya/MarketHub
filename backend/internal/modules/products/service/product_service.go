package service

import (
	"errors"

	"github.com/google/uuid"
	"github.com/vendrya/markethub/internal/modules/products/dto"
	"github.com/vendrya/markethub/internal/modules/products/models"
	"github.com/vendrya/markethub/internal/modules/products/repository"
)

type ProductService struct {
	productRepo  *repository.ProductRepository
	tagRepo      *repository.TagRepository
	categoryRepo *repository.CategoryRepository
}

func NewProductService(pRepo *repository.ProductRepository, tagRepo *repository.TagRepository, categoryRepo *repository.CategoryRepository) *ProductService {
	return &ProductService{
		productRepo:  pRepo,
		tagRepo:      tagRepo,
		categoryRepo: categoryRepo,
	}
}

func (s *ProductService) FindAllProducts() ([]models.Product, error) {
	products, err := s.productRepo.FindAllProducts()
	if err != nil {
		return nil, errors.New("Error to find products")
	}

	return products, nil
}

func (s *ProductService) CreateProduct(req dto.CreateProductRequest, userId uuid.UUID) error {
	var tags []models.Tag
	for _, tagID := range req.TagsID {
		tag, err := s.tagRepo.FindTagByID(tagID)
		if err != nil || tag == nil {
			return errors.New("Error to find tag")
		}

		tags = append(tags, *tag)
	}

	category, err := s.categoryRepo.FindCategoryByID(req.CategoryID)
	if err != nil || category == nil {
		return errors.New("Error to find category")
	}

	newProduct := models.Product{
		Title:       req.Title,
		Description: req.Description,
		Price:       req.Price,
		CategoryID:  category.ID,
		Tags:        tags,
		UserID:      userId,
	}

	err = s.productRepo.CreateProduct(&newProduct)
	if err != nil {
		return errors.New("Error to create product")
	}

	return nil
}
