package com.easy.car_rental.repo;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface IncomeRepo extends JpaRepository<CustomDTO, String> {
}
