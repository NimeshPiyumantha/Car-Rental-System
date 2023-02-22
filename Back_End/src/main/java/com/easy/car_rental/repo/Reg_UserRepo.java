package com.easy.car_rental.repo;

import com.easy.car_rental.dto.Reg_UserDTO;
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

    @Query(value = "SELECT reg_user.user_Id,reg_user.firstName,reg_user.lastName,reg_user.contact_No,reg_user.address,reg_user.email,reg_user.nic,reg_user.license_No,reg_user.nic_Img,reg_user.license_Img FROM Reg_User JOIN  user u on u.user_Id = reg_user.user_Id where user_Name=?1", nativeQuery = true)
    Reg_UserDTO availableUser(String userName);
}
