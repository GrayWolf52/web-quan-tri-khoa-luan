<template>
  <div>
    <CRow>
      <CCol md="12">
        <CButton type="reset" size="sm" color="danger" class="btn btn-custom-size" @click="CancelCreate()">
          <i class="cil-x"></i>
          Huỷ
        </CButton>
        <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="createNewAccount()">
          <i class="cil-plus"></i>
          Thêm mới
        </CButton>
      </CCol>
      <br />
      <br />

      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin người dùng </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Tài khoản <span style="color: red">*</span>
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Nhập tên đăng nhập" style="width: 70%"
                  v-model="userName" />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Mật khẩu <span style="color: red">*</span>
                </div>
                <input type="password" class="input-custom-border-none" placeholder="Nhập mật khẩu" style="width: 70%"
                  v-model="passWord" />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Họ <span style="color: red">*</span>
                </div>

                <input type="text" class="input-custom-border-none" placeholder="Nhập họ người dùng" style="width: 70%"
                  v-model="firstName" />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Tên <span style="color: red">*</span>
                </div>

                <input type="text" class="input-custom-border-none" placeholder="Nhập tên người dùng" style="width: 70%"
                  v-model="lastName" />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Điện thoại
                </div>

                <input type="text" class="input-custom-border-none" placeholder="Số điện thoại" style="width: 70%"
                  v-model="phone" />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 15%; float: left; font-weight: 600">
                  Địa chỉ
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Địa chỉ cụ thể" style="width: 70%"
                  v-model="address" />
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLyAccountCreate",

  data() {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      position: "",
      department: "",
      userName: "",
      passWord: "",
      createBy: "",
    };
  },
  created() {
    // this.getAllProduct();
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    CancelCreate() {
      this.$router.push("/account/quanlyaccount");
    },
    UpdateProduct() {
      this.$router.push("/quanlysanphamupdate");
    },
    createNewAccount() {
      let item = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        address: this.address,
        userName: this.userName,
        passWord: this.passWord,
      };
      console.log(item)
      axios
        .post(this.$store.state.MainLink + "User/AddUser", item)
        .then((response) => {
          console.log(response);
          this.$router.push({
            name: "Danh sách tài khoản",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scope>
.btn-custom-size {
  width: 130px;
  margin-left: 15px;
  float: right;
}

.input-custom-border-none {
  border: none;
  box-shadow: none;
  box-sizing: border-box;
}

.title-td {
  width: 35%;
}
</style>
