import del  from "del";
import path from "../config/path.js";

export default () => {
    return del(path.root);
}