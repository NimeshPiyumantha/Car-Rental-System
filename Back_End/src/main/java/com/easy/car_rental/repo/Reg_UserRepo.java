package com.easy.car_rental.repo;

import com.easy.car_rental.entity.Reg_User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface Reg_UserRepo extends JpaRepository<Reg_User, String> {
}
