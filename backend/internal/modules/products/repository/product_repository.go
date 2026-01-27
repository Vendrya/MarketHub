package repository

import (
	"github.com/vendrya/markethub/internal/modules/products/models"
	"gorm.io/gorm"
)

type ProductRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) *ProductRepository {
	return &ProductRepository{db: db}
}

func (r *ProductRepository) FindAllProducts() ([]models.Product, error) {
	var products []models.Product
	if err := r.db.Model(&models.Product{}).Preload("Tags").Preload("Category").Find(&products).Error; err != nil {
		return nil, err
	}

	return products, nil
}

func (r *ProductRepository) CreateProduct(product *models.Product) error {
	if err := r.db.Create(product).Error; err != nil {
		return err
	}

	return nil
}
