package dto

import "github.com/google/uuid"

type CreateProductRequest struct {
	Title       string      `json:"title" binding:"required"`
	Description string      `json:"description"`
	Price       float64     `json:"price" binding:"required"`
	CategoryID  uuid.UUID   `json:"categoryId" binding:"required"`
	TagsID      []uuid.UUID `json:"tags"`
}
