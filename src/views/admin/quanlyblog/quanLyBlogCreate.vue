<template>
    <div>
        <CRow>
            <CCol md="12">
                <CButton type="reset" size="sm" color="danger" class="btn btn-custom-size" @click="CancelCreate()">
                    <i class="cil-x"></i>
                    Huỷ
                </CButton>
                <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="createProduct()"
                    v-if="checkProduct == 1">
                    <i class="cil-plus"></i>
                    Lưu sản phẩm
                </CButton>
            </CCol>
            <br />
            <br />
            <CCol md="12" lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-justify-center" />
                        <strong> Thông tin sự kiện </strong>
                        <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size"
                            @click="createProduct()">
                            <i class="cil-plus"></i>
                            Lưu sự kiện
                        </CButton>
                    </CCardHeader>
                    <CCardBody height="auto">
                        <CListGroup>
                            <CListGroupItem>Tên sự kiện:
                                <input type="text" class="input-custom-border-none" placeholder="Nhập tên tự kiện"
                                    v-model="title" style="width: 80%" />
                            </CListGroupItem>
                            <CListGroupItem>Mô tả:
                                <input type="text" class="input-custom-border-none" placeholder="Mô tả sự kiện"
                                    v-model="description" style="width: 80%" />
                            </CListGroupItem>
                            <CListGroupItem>Nhóm liên quan:
                                <select class="form-select" v-model="groupName">
                                    <option selected v-for="(item, index) in dataGroup" :key="index" :value="item.id">{{
                                            item.groupName
                                    }}
                                    </option>
                                </select>
                            </CListGroupItem>
                            <CListGroupItem>Người tham gia:
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <button @click="createNewUser()" style="border: none">
                                                    +
                                                </button>
                                            </th>
                                            <th scope="col">Tên người dùng</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in Participants" :key="index">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>
                                                <select class="form-select form-select-sm"
                                                    aria-label=".form-select-sm example" v-model="item.id"
                                                    style="border: none;border-bottom: 1px dashed;box-shadow: none;">
                                                    <option selected disabled>Chọn người tham gia ...</option>
                                                    <option :value="user.id" v-for="user in listUser" :key="user.id">
                                                        {{ user.firstName }} {{ user.lastName }}
                                                    </option>
                                                </select>
                                            </td>
                                            <td class="text-center">
                                                <i class="cil-trash" style="color: red" @click="deleteColor(index)"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CListGroupItem>
                            <CListGroupItem> Thông tin người tạo: <br /><br />
                                <label>id: </label><input type="text" class="input-custom-border-none"
                                    placeholder="Giá máy" v-model="dataUser.id" style="width: 80%" disabled />
                                <br />
                                <label>Tên đăng nhập: </label><input type="text" class="input-custom-border-none"
                                    placeholder="Giá máy" v-model="dataUser.userName" style="width: 80%" disabled />
                                <br />
                                <label>Họ: </label><input type="text" class="input-custom-border-none"
                                    placeholder="Giá máy" v-model="dataUser.firstName" style="width: 80%" disabled />
                                <br />
                                <label>Tên: </label><input type="text" class="input-custom-border-none"
                                    placeholder="Giá máy" v-model="dataUser.lastName" style="width: 80%" disabled />
                                <br />
                                <label>Điện thoại: </label><input type="text" class="input-custom-border-none"
                                    placeholder="Giá máy" v-model="dataUser.phone" style="width: 80%" disabled />
                                <br />
                                <label>Địa chỉ: </label><input type="text" class="input-custom-border-none"
                                    placeholder="Giá máy" v-model="dataUser.address" style="width: 80%" disabled />
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
    name: "QuanLySanPhamCreate",
    data() {
        return {
            nameGroup: "",
            dataUser: {},
            listUser: "",
            checkProduct: 0,
            dataGroup: "",
            groupName: 0,
            title: "",
            description: "",
            Participants: [],
            userParti: {},
            id: ""
        };
    },
    created() {
        this.getDataUser();
        this.getDataGroup();
        this.getDataUserList();
    },
    methods: {
        validator(val) {
            return val ? val.length >= 4 : false;
        },
        createProduct() {
            let item = {
                title: this.title,
                description: this.description,
                recurrenceType: 0,
                groupId: this.groupName,
                creator: {
                    id: this.dataUser.id,
                    userName: this.dataUser.userName,
                    firstName: this.dataUser.firstName,
                    lastName: this.dataUser.lastName,
                    phone: this.dataUser.phone,
                    address: this.dataUser.address
                },
                participants: this.Participants
            }

            // console.log(item);
            axios
                .post(
                    "http://localhost:5000/api/Event/InsertOrUpdate",
                    item
                )
                .then((response) => {
                    this.$router.push("/blog/quanlyblog");
                    alert("Thêm thành công!")
                })
                .catch(function (error) {
                    alert("Thêm thất bại!");
                });
        },
        createNewUser() {
            let item = {
                id: ""
            }
            this.Participants.push(item)
            console.log(this.Participants);
        },
        deleteColor(index) {
            this.Participants.splice(index, 1);
        },
        CancelCreate() {
            this.$router.push("/admin/quanlysanphamlist");
        },
        UpdateProduct() {
            this.$router.push("/quanlysanphamupdate");
        },
        getDataUser() {
            axios
                .get(
                    this.$store.state.MainLink + "User/GetById/" + localStorage.username
                )
                .then((response) => {
                    // console.log(response.data);
                    this.dataUser = response.data
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getDataGroup() {
            axios
                .get(this.$store.state.MainLink + "Group/GetAll")
                .then((response) => {
                    this.dataGroup = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getDataUserList() {
            axios
                .get(this.$store.state.MainLink + "User/GetAll")
                .then((response) => {
                    this.listUser = response.data;
                    console.log(this.listUser);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
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
