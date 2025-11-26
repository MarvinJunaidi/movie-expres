import movieModel from "../models/movieModel.js";
import mongoose, { mongo } from "mongoose";

export const movie = async (req,res) => {
    try {
        const movie = await movieModel.find({
            createdBy : req.user?.user_id
        }).sort({ createdAt : -1 });

        return res.status(200).json({
            message : "Daftar semua movie",
            data : movie,
        });
    } catch (error) {
        return res.status(500).json({
            message : "Terjadi kesalahan pada server",
            error : error.message,
            data : null,
        });
    }
};

export const addNewMovie = async (req,res) => {
    try {
        const { judul, tahunRilis, sutradara} = req.body;

        if (!judul || !tahunRilis || !sutradara) {
            return res.status(400).json({
                message : "Semua field (judul, tahunrilis, sutradara) wajib diisi",
                data : null
            });
        }

        const movie = await movieModel.create({judul, tahunRilis, sutradara, createdBy: req.user?.user_id});

        return res.status(201).json({
            message : "Berhasil menambahkan movie baru",
            data : movie,
        });
    } catch (error) {
        return res.status(500).json({
            message : "Gagal menambahkan movie",
            error : error.message,
            data : null
        })
    }
};

export const detailMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message : "ID tidak valid", data : null});
        }

        const movie = await movieModel.findOne({
            _id : id,
            createdBy : req.user?.user_id,
        });

        if (!movie) {
            return res.status(404).json({ message : "Movie tidak ditemukan", data : null});
        }

        return res.status(200).json({ message : "Detail Movie", data : movie});
    } catch (error) {
        return res.status(500).json({
            message : "Terjadi kesalahan pada server",
            error : error.message,
            data : null
        });
    }
};

export const updateMovie = async (req,res) => {
    try{
        const {id} = req.params;
        const { judul, tahunRilis, sutradara} = req.body;

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message : "ID tidak valid",
                data: null
            });
        }
       
        const updateMovie = await movieModel.findOneAndUpdate({
            _id:id,
            createdBy: req.user?.user_id
        },
        {judul, tahunRilis, sutradara},
        {new : true}
    );

    if (!updateMovie){
        return res.status(404).json({
            message : "Movie tidak ditemukan atau akses ditolak",
            data : null
        });
    }

    return res.status(200).json({
        message : "Berhasil mengupdate movie",
        data : updateMovie
    });

    }catch (error){
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error : error.message,
            data: null
        });
    }
};

export const deleteMovie = async (req,res)=>{
    try {
        const {id} = req.params;
        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "ID tidak valid",
                data: null
            });
        }

        const deleteMovie = await movieModel.findByIdAndDelete({
            _id : id,
            createdBy: req.user?.user_id
        });

        if(!deleteMovie) {
            res.status(404).json({
                message : "Movie tidak ditemukan atau akses ditolak",
                data: null
            });
        }
        return res.status(200).json({
            message: "Berhasil menghapus movie",
            date: deleteMovie
        });
    }catch (error){
        return res.status(500).json({
            message : "Terjadi kesalahan pada server",
            error : error.message,
            data: null
        });
    }
};