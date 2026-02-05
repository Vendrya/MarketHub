package repository

import (
	"github.com/google/uuid"
	"github.com/vendrya/markethub/internal/modules/products/models"
	"gorm.io/gorm"
)

type CategoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) *CategoryRepository {
	return &CategoryRepository{db: db}
}

func (r *CategoryRepository) FindCategoryByID(id uuid.UUID) (*models.Category, error) {
	var category models.Category
	if err := r.db.First(&category, id).Error; err != nil {
		return nil, err
	}

	return &category, nil
}
