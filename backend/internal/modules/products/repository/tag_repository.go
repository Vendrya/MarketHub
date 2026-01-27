package repository

import (
	"github.com/google/uuid"
	"github.com/vendrya/markethub/internal/modules/products/models"
	"gorm.io/gorm"
)

type TagRepository struct {
	db *gorm.DB
}

func NewTagRepository(db *gorm.DB) *TagRepository {
	return &TagRepository{db: db}
}

func (r *TagRepository) FindTagByID(id uuid.UUID) (*models.Tag, error) {
	var tag models.Tag
	if err := r.db.First(&tag, id).Error; err != nil {
		return nil, err
	}

	return &tag, nil
}
