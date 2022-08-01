import { Router } from "express";
import { getCategories, getCategoryById, insertCategory, updateCategoryById, deleteCategoryById } from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter.route('/')
.get(getCategories)
.post(insertCategory);

categoryRouter.route('/:categoryId')
.get(getCategoryById)
.put(updateCategoryById)
.delete(deleteCategoryById);

export default categoryRouter;