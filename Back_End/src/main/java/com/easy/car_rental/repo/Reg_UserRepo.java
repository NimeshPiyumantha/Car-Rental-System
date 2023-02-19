package com.easy.car_rental.repo;

import com.easy.car_rental.entity.Reg_User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface Reg_UserRepo extends JpaRepository<Reg_User, String> {
    @Query(value = "SELECT user_Id FROM Reg_User ORDER BY user_Id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(user_Id) FROM Reg_User", nativeQuery = true)
    int getSumUsers();
}
