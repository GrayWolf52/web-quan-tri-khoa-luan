<template>
    <div>
        <CRow>
            <CCol md="12">
                <CButton type="reset" size="sm" color="danger" class="btn btn-custom-size" @click="CancelCreate()">
                    <i class="cil-x"></i>
                    Huỷ
                </CButton>
                <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="UpdateProduct()">
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
                                <input type="text" class="input-custom-border-none" placeholder="Nhập tên đăng nhập"
                                    style="width: 65%" v-model="this.getData.id" disabled />
                            </CListGroupItem>
                            <CListGroupItem>
                                <div style="width: 20%; float: left; font-weight: 600">
                                    Tài khoản <span style="color: red">*</span>
                                </div>
                                <input type="text" class="input-custom-border-none" placeholder="Nhập mật khẩu"
                                    style="width: 65%" v-model="this.getData.userName" disabled />
                            </CListGroupItem>
                            <CListGroupItem>
                                <div style="width: 20%; float: left; font-weight: 600">
                                    Họ <span style="color: red">*</span>
                                </div>
                                <input type="text" class="input-custom-border-none" placeholder="Nhập họ người dùng"
                                    style="width: 65%" v-model="getData.firstName" />
                            </CListGroupItem>
                            <CListGroupItem>
                                <div style="width: 20%; float: left; font-weight: 600">
                                    Tên <span style="color: red">*</span>
                                </div>
                                <input type="text" class="input-custom-border-none" placeholder="Nhập tên người dùng"
                                    style="width: 65%" v-model="getData.lastName" />
                            </CListGroupItem>
                            <CListGroupItem>
                                <div style="width: 20%; float: left; font-weight: 600">
                                    Điện thoại
                                </div>
                                <input type="text" class="input-custom-border-none" placeholder="Số điện thoại"
                                    style="width: 65%" v-model="getData.phone" />
                            </CListGroupItem>
                            <CListGroupItem>
                                <div style="width: 20%; float: left; font-weight: 600">
                                    Địa chỉ
                                </div>
                                <input type="text" class="input-custom-border-none" placeholder="Địa chỉ cụ thể"
                                    style="width: 65%" v-model="getData.address" />
                            </CListGroupItem>
                            <CListGroupItem>
                                <div style="width: 20%; float: left; font-weight: 600">
                                    Chức vụ
                                </div>
                                <input type="text" class="input-custom-border-none" placeholder="Chức vụ nhân viên"
                                    style="width: 65%" v-model="getData.position" />
                            </CListGroupItem>
                            <CListGroupItem>
                                <div style="width: 20%; float: left; font-weight: 600">
                                    Phòng ban
                                </div>
                                <input type="text" class="input-custom-border-none" placeholder="Phòng ban"
                                    style="width: 65%" v-model="getData.department" />
                            </CListGroupItem>
                            <CListGroupItem>
                                <div style="width: 20%; float: left; font-weight: 600">
                                    Ngày tạo
                                </div>
                                <input type="text" class="input-custom-border-none" placeholder="Ngày tạo"
                                    style="width: 65%" v-model="this.getData.createDate" disabled />
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
        data: {},
    },
    data() {
        return {
            getData: {},
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            position: "",
            department: "",
            userName: "",
            createBy: ""
        };
    },
    mounted() {
        this.getDetailAccount();
    },
    methods: {
        CancelCreate() {
            this.$router.push("/account/quanlyaccount");
        },
        UpdateProduct() {
            console.log(this.getData);
            axios
                .put(this.$store.state.MainLink + "User", this.getData)
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
        getDetailAccount() {
            // console.log(this.data);
            this.getData = this.data;
        },
    },
};
</script>

<style scoped>
.Title-font-size {
    font-weight: 600;
}
</style>
