<template>
  <div>
    <CRow>
      <CCol md="12">
        <CButton type="reset" size="sm" color="danger" class="btn btn-custom-size" @click="CancelCreate()">
          <i class="cil-x"></i>
          Huỷ
        </CButton>
        <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="UpdateProduct(getData)">
          <i class="cil-sync"></i>
          Sửa tài khoản
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
                <div style="width: 20%; float: left; font-weight: 600">
                  Mã người dùng <span style="color: red">*</span>
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Nhập tên đăng nhập" style="width: 65%"
                  v-model="this.getData.id" disabled />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 20%; float: left; font-weight: 600">
                  Tài khoản <span style="color: red">*</span>
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Nhập mật khẩu" style="width: 65%"
                  v-model="this.getData.userName" disabled />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 20%; float: left; font-weight: 600">
                  Họ <span style="color: red">*</span>
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Nhập họ người dùng" style="width: 65%"
                  v-model="this.getData.firstName" disabled />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 20%; float: left; font-weight: 600">
                  Tên <span style="color: red">*</span>
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Nhập tên người dùng" style="width: 65%"
                  v-model="this.getData.lastName" disabled />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 20%; float: left; font-weight: 600">
                  Điện thoại
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Số điện thoại" style="width: 65%"
                  v-model="this.getData.phone" disabled />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 20%; float: left; font-weight: 600">
                  Địa chỉ
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Địa chỉ cụ thể" style="width: 65%"
                  v-model="this.getData.address" disabled />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 20%; float: left; font-weight: 600">
                  Chức vụ
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Chức vụ nhân viên" style="width: 65%"
                  v-model="this.getData.position" disabled />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 20%; float: left; font-weight: 600">
                  Phòng ban
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Phòng ban" style="width: 65%"
                  v-model="this.getData.department" disabled />
              </CListGroupItem>
              <CListGroupItem>
                <div style="width: 20%; float: left; font-weight: 600">
                  Ngày tạo
                </div>
                <input type="text" class="input-custom-border-none" placeholder="Ngày tạo" style="width: 65%"
                  v-model="this.getData.createDate" disabled />
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
  name: "QuanLyTaiKhoanDetail",
  props: {
    item: Number,
  },
  data() {
    return {
      getData: {},
      show: true,
      formCollapsed: true,
    };
  },
  mounted() {
    this.getDetailAccount();
  },
  methods: {
    CancelCreate() {
      this.$router.push("/account/quanlyaccount");
    },
    UpdateProduct(data) {
      this.$router.push({
        name: "Cập nhật thông tin tài khoản",
        params: { data: data },
      });
    },
    getDetailAccount() {
      axios
        .get(
          this.$store.state.MainLink + "User/GetById/" + this.item
        )
        .then((response) => {
          this.getData = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.Title-font-size {
  font-weight: 600;
}
</style>
