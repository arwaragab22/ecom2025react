import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;
interface Icateogry {
  id: number;
  title: string;
  img: string;
  prefix: string;
}
const Category = ({title,img,prefix}:Icateogry) => {
  return (
    <div className={category} >
      <Link to={`products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt="" />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
