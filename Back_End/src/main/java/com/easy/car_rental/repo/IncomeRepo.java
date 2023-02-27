package com.easy.car_rental.repo;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.entity.Payment;
import com.easy.car_rental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface IncomeRepo extends JpaRepository<Rent,String> {
    @Query(value = "SELECT Payment.date,count(payment.paymentID),sum(payment.total) FROM Rent INNER JOIN Payment ON Rent.rentID = Payment.rentID GROUP BY date", nativeQuery = true)
    List<CustomDTO> dailyIncome();

    @Query(value = "SELECT (MONTHNAME(date )) ,count(payment.paymentID),sum(payment.total)FROM Rent INNER JOIN Payment ON Rent.rentID = Payment.rentID  GROUP BY extract(MONTH FROM(date))", nativeQuery = true)
    List<CustomDTO> MonthlyIncome();

    @Query(value = "SELECT (YEAR(date )) ,count(payment.paymentID),sum(payment.total)FROM Rent INNER JOIN Payment ON Rent.rentID = Payment.rentID  GROUP BY extract(YEAR FROM(date))", nativeQuery = true)
    List<CustomDTO> AnnuallyIncome();
}
