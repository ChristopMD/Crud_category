import { Request, Response } from "express";
import { connect } from "../database";
import { Category } from "../interfaces/Category";

export async function getCategories(req: Request, res: Response):Promise<Response>{
    const conn = await connect();
    const categories = await conn.query('SELECT * FROM categoria');
    return res.json(categories[0]);

}

export async function getCategoryById(req: Request, res: Response): Promise<Response>{
    const id = Number(req.params.categoryId);
    const conn = await connect();
    const category = await conn.query('SELECT * FROM categoria WHERE cat_id = ?',[id]);
    if (Object.keys(category[0]).length > 0) {
        //console.log(Object.keys(category[0]).length);
        return res.json(category[0]);
    } else {
        return res.status(404).json({message: "The Category does not exist"});
    }

}

export async function insertCategory(req: Request, res: Response){
    const newCategory: Category = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO categoria SET ?', [newCategory]);
    return res.json({
        message: "Category created"
    })
}

export async function updateCategoryById(req: Request, res: Response){
    const id = Number(req.params.categoryId);
    const updateCategory: Category = req.body;
    const conn = await connect();
    await conn.query('UPDATE categoria SET ? WHERE cat_id = ?', [updateCategory, id]);
    return res.json({
        message: "Category updated"
    })
}

export async function deleteCategoryById(req: Request, res: Response){
    const id = Number(req.params.categoryId);
    const conn =await connect();
    await conn.query('DELETE FROM categoria WHERE cat_id = ?',[id]);
    return res.json({
        message: "Category deleted"
    })
}