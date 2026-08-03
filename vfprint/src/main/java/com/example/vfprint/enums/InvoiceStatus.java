package com.example.vfprint.enums;

public enum InvoiceStatus {
    DRAFT,          // Nháp, chưa phát hành
    ISSUED,         // Đã tạo/phát hành hóa đơn
    PENDING_PAYMENT,// Đang chờ thanh toán
    PAID,           // Đã thanh toán
    PARTIALLY_PAID, // Thanh toán một phần
    OVERDUE,        // Quá hạn thanh toán
    CANCELLED,      // Đã hủy
    REFUNDED        // Đã hoàn tiền
}
