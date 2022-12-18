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
        <CCard v-if="show == 1">
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin nhóm </strong>
            <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="createProduct()">
              <i class="cil-plus"></i>
              Lưu nhóm
            </CButton>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>Tên nhóm:
                <input type="text" class="input-custom-border-none" placeholder="Nhập tên nhóm" v-model="nameGroup"
                  style="width: 80%" />
              </CListGroupItem>
              <CListGroupItem> Thông tin người tạo: <br /><br />
                <label>id: </label><input type="text" class="input-custom-border-none" placeholder="Giá máy"
                  v-model="dataUser.id" style="width: 80%" disabled />
                <br />
                <label>Tên đăng nhập: </label><input type="text" class="input-custom-border-none" placeholder="Giá máy"
                  v-model="dataUser.userName" style="width: 80%" disabled />
                <br />
                <label>Họ: </label><input type="text" class="input-custom-border-none" placeholder="Giá máy"
                  v-model="dataUser.firstName" style="width: 80%" disabled />
                <br />
                <label>Tên: </label><input type="text" class="input-custom-border-none" placeholder="Giá máy"
                  v-model="dataUser.lastName" style="width: 80%" disabled />
                <br />
                <label>Điện thoại: </label><input type="text" class="input-custom-border-none" placeholder="Giá máy"
                  v-model="dataUser.phone" style="width: 80%" disabled />
                <br />
                <label>Địa chỉ: </label><input type="text" class="input-custom-border-none" placeholder="Giá máy"
                  v-model="dataUser.address" style="width: 80%" disabled />
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>

        <CCard v-else>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thêm người dùng vào nhóm </strong>
            <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="addUser()">
              <i class="cil-sync"></i>
              Lưu thông tin
            </CButton>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>Thêm thành viên:
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
                    <tr v-for="(item, index) in listUser" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>
                        <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                          v-model="item.Key" style="border: none;border-bottom: 1px dashed;box-shadow: none;">
                          <option selected disabled>Chọn người tham gia ...</option>
                          <option :value="user.id" v-for="user in getData" :key="user.id">
                            {{ user.firstName }} {{ user.lastName }}
                          </option>
                        </select>
                      </td>
                      <td class="text-center">
                        <i class="cil-trash" style="color: red" @click="deleteUser(index)"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
      show: 1,
      nameGroup: "",
      dataUser: {},
      checkProduct: 0,
      getData: "",
      listUser: [],
      idGroup: 0,
      descriptionGroup: ""
    };
  },
  created() {
    this.getDataUser();
    this.getListUser();
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    createProduct() {
      let item = {
        name: this.nameGroup,
        creator: {
          id: this.dataUser.id,
          userName: this.dataUser.userName,
          firstName: this.dataUser.firstName,
          lastName: this.dataUser.lastName,
          phone: this.dataUser.phone,
          address: this.dataUser.address
        },
        description: this.descriptionGroup
      };
      this.show = 0;
      axios
        .post(
          "http://localhost:5000/api/Group/Update",
          item
        )
        .then((response) => {
          // this.$router.push("/admin/quanlysanphamlist");
          this.idGroup = response.data
        })
        .catch(function (error) {
          alert(error);
        });
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
    addUser() {
      axios
        .post(this.$store.state.MainLink + "UserGroup/Add/" + this.idGroup, this.listUser)
        .then((response) => {
          alert("Thêm thành công!");
          this.$router.push("/admin/quanlysanphamlist");
        })
        .catch((e) => {
          console.log(e.message);
          alert('Thêm thất bại !')
        });
    },
    getListUser() {
      axios
        .get(this.$store.state.MainLink + "User/GetAll")
        .then((response) => {
          this.getData = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createNewUser() {
      let item = {
        Key: 0,
        Value: 1
      }
      this.listUser.push(item)
      console.log(this.listUser);
    },
    deleteUser(index) {
      this.listUser.splice(index, 1);
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
