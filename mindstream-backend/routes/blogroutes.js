const express = require("express");
const router = express.Router();
const {
    createblog,
    getallblogs,
    getblogbyid,
    updateblog,
    deleteblog,
    addcomment,
    deletecomment,
    userblog
} = require("../controller/blogcontroller");

const authmiddlwere = require("../config/auth");


router.post("/", authmiddlwere , createblog)
router.get("/", getallblogs);
router.get("/:id", getblogbyid);
router.put("/:id", authmiddlwere , updateblog),
router.delete("/:id", authmiddlwere , deleteblog);
router.post("/:id/comments",authmiddlwere , addcomment);
router.delete("/:id/comments/:commentid", authmiddlwere, deletecomment);

module.exports = router;