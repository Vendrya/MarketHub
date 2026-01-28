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
	err := r.db.Preload("Category").Preload("Tags").Preload("User").Find(&products).Error
	return products, err
}

func (r *ProductRepository) CreateProduct(product *models.Product) error {
	if err := r.db.Create(product).Error; err != nil {
		return err
	}

	return nil
}
