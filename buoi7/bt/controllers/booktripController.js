import Travel from "../models/booktrip.js";  // Import mô hình Travel

class BookController {

    // Hiển thị danh sách chuyến đi và hỗ trợ tìm kiếm
    static async index(req, res) {
        let q = req.query.q;  // Lấy từ query string
        const re = new RegExp(q, 'i');  // Tạo biểu thức chính quy cho tìm kiếm không phân biệt chữ hoa, chữ thường
        let books;

        try {
            if (q) {
                // Nếu có truy vấn tìm kiếm, tìm chuyến đi theo tên khách hàng hoặc trạng thái
                books = await Travel.find({
                    $or: [
                        { customerName: re },
                        { status: re }
                    ]
                });
            } else {
                // Nếu không có truy vấn tìm kiếm, lấy tất cả chuyến đi
                books = await Travel.find();
            }
            res.render("bookingsList", { title: "Bookings Dashboard", booktrips: books, q });
        } catch (error) {
            console.error("Error fetching books:", error);
            res.status(500).send("Error fetching books.");
        }
    }

    // Hiển thị form tạo chuyến đi mới
    static async new(req, res) {
        res.render("formnewBook", { title: "Create New Book" });
    }

    // Tạo mới chuyến đi
    static async create(req, res) {
        const { id, customerName, date, time, status } = req.body;  // Lấy dữ liệu từ form

        try {
            // Tạo đối tượng Travel mới
            const travel = new Travel({ id, customerName, date, time, status });
            await travel.save();  // Lưu vào cơ sở dữ liệu
            res.redirect("/books");  // Chuyển hướng đến trang danh sách chuyến đi
        } catch (error) {
            console.error("Error saving travel:", error);
            res.status(500).send("An error occurred while saving the travel.");
        }
    }

    // Xóa chuyến đi
    static async delete(req, res) {
        const { id } = req.params;  // Lấy id chuyến đi từ tham số đường dẫn
        
        try {
            const result = await Travel.deleteOne({ _id: id });  // Xóa chuyến đi theo id
            if (result.deletedCount === 0) {
                console.log("Không thể xóa chuyến đi.");
            } else {
                console.log("Đã xóa chuyến đi.");
            }
            res.redirect("/books");  // Chuyển hướng về trang danh sách chuyến đi
        } catch (error) {
            console.error("Error deleting travel:", error);
            res.status(500).send("An error occurred while deleting the travel.");
        }
    }

    // Hiển thị form chỉnh sửa chuyến đi
    static async edit(req, res) {
        const { id } = req.params;  // Lấy id chuyến đi từ tham số đường dẫn
        
        try {
            const travel = await Travel.findById(id);  // Tìm chuyến đi theo id
            if (travel) {
                res.render("formeditBook", { title: "Edit Book", book: travel });  // Render form chỉnh sửa chuyến đi
            } else {
                res.status(404).send("Travel not found.");
            }
        } catch (error) {
            console.error("Error loading travel data:", error);
            res.status(500).send("Error loading travel data.");
        }
    }

    // Cập nhật thông tin chuyến đi
    static async update(req, res) {
        const { id } = req.params;  // Lấy id chuyến đi từ tham số đường dẫn
        const { customerName, date, time, status } = req.body;  // Lấy dữ liệu từ form
        
        try {
            await Travel.findByIdAndUpdate(id, { customerName, date, time, status });  // Cập nhật thông tin chuyến đi theo id
            res.redirect("/books");  // Chuyển hướng về trang danh sách chuyến đi
        } catch (error) {
            console.error("Error updating travel:", error);
            res.status(500).send("Error updating travel.");
        }
    }
}

export default BookController;
