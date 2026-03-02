import "./productPage.scss";
import { FaPlus } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

const ProductPage = () => {

    return (
        <div className="product-page">
            <div className="product-header">
                <h3>Sản phẩm</h3>

                <button className="add-product-btn"> <FaPlus /> Thêm sản phẩm</button>
            </div>

            <div className="product-info">
                {/* Tìm kiếm sản phẩm theo tên, mã sản phẩm hoặc mô tả. Bạn cũng có thể lọc sản phẩm theo danh mục, giá cả hoặc nhà cung cấp. */}
                <div className="product-search">
                    <FiSearch className="search-icon" />
                    <input type="text" value="" placeholder="Tìm kiếm..." />
                    <button>Tìm kiếm</button>
                </div>


                {/* danh sách sản phẩm sẽ hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả. Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                <div className="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Mã sản phẩm</th>
                                <th>Mô tả</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* sản phẩm sẽ được hiển thị ở đây. Mỗi sản phẩm sẽ có thông tin như tên, mã sản phẩm, mô tả . Bạn có thể nhấp vào một sản phẩm để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}

                            {/* sản phẩm A */}
                            <tr>
                                <td>Sản phẩm A</td>
                                <td>SP001</td>
                                <td>Mô tả sản phẩm A </td>
                                <td className="action-buttons">
                                    <button className=" icon edit-btn"><FiEdit /></button>
                                    <button className=" icon delete-btn"><FiTrash2 /></button>
                                </td>

                            </tr>

                            {/* sản phẩm  B*/}
                            <tr>
                                <td>Sản phẩm B</td>
                                <td>SP002</td>
                                <td>Mô tả sản phẩm B </td>
                                <td className="action-buttons">
                                    <button className=" icon edit-btn"><FiEdit /></button>
                                    <button className=" icon delete-btn"><FiTrash2 /></button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default ProductPage;