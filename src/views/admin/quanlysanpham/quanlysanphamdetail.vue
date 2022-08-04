<template>
  <div>
    <CRow>
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin của nhóm </strong>
            <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="updateShow()"
              v-if="update == true" style="float: right;">
              <i class="cil-sync"></i>
              Sửa nhóm
            </CButton>
            <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="UpdateGroup()" v-else
              style="float: right;">
              <i class="cil-sync"></i>
              Sửa nhóm
            </CButton>
            <CButton type="submit" size="sm" color="danger" class="btn btn-custom-size" @click="CancelCreate()"
              style="float: right;">
              <i class="cil-x"></i>
              Hủy
            </CButton>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size">Mã nhóm : </span>
                <span>{{ getData.id }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Tên nhóm : </span>
                <span v-if="update == true">{{ getData.groupName }}</span>
                <input v-else type="text" class="input-custom-border-none" placeholder="Tên nhóm" v-model="nameGroup"
                  style="width: 80%" />
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Mã người tạo : </span>
                <span>{{ dataUser.id }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Người tạo : </span>
                <span>{{ dataUser.firstName }}</span> <span>{{ dataUser.lastName }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Điện thoại : </span>
                <span>{{ dataUser.phone }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Ngày tạo : </span>
                <span>{{ getData.createdTime }}</span>
              </CListGroupItem>
              <CListGroupItem>Danh sách thành viên:
                <!-- <CButton type="submit" size="sm" color="primary" class="btn btn-custom-size" @click="UpdateListUser()"
                  style="float: right;" v-if="update != true">
                  <i class="cil-sync"></i>
                  Cập nhật danh sách thành viên
                </CButton> -->
                <table class="table" v-if="update == true">
                  <thead>
                    <tr>
                      <th scope="col">
                        #
                      </th>
                      <th scope="col">Tên người dùng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in listUser" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>
                        {{ item.user.firstName }} {{ item.user.lastName }}
                      </td>
                    </tr>
                  </tbody>
                </table>


                <table class="table" v-else>
                  <thead>
                    <tr>
                      <th scope="col">
                        #
                      </th>
                      <th scope="col">Tên người dùng</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in listUser" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>
                        {{ item.user.firstName }} {{ item.user.lastName }}
                      </td>
                      <td class="text-center">
                        <i class="cil-trash" style="color: red" @click="deleteUser(item.user.id, item.group.id)"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- <CCol md="12">
        <table class="table" style="background: white">
          <tbody>
            <thead>
              <tr>
                <th scope="col">Thông tin cấu hình sản phẩm</th>
              </tr>
            </thead>
            <tr v-for="item in getData.productDetails" :key="item">
              <td>{{ item.propertyName }}</td>
              <td>{{ item.propertyValue }}</td>
            </tr>
          </tbody>
        </table>
      </CCol> -->
    </CRow>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamDetail",
  props: {
    item: Number
  },
  data() {
    return {
      getData: "",
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      selectedOption: "some value",
      nameGroup: "",
      formCollapsed: true,
      update: true,
      dataUser: {},
      listUser: [],
      listUserUpdate: []
    };
  },
  created() {
    this.getDetailProduct();
    this.getListUser();
  },
  methods: {
    updateShow() {
      this.update = false
    },
    UpdateGroup() {
      let item = {
        id: this.item,
        name: this.nameGroup
      }
      axios
        .post(
          "http://localhost:5000/api/Group/ChangeName",
          item
        )
        .then((response) => {
          this.$router.push("/admin/quanlysanphamlist");
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
    getDetailProduct() {
      axios
        .get(this.$store.state.MainLink + "Group/GetById/" + this.item)
        .then((response) => {
          this.getData = response.data;
          axios
            .get(
              this.$store.state.MainLink + "User/GetById/" + this.getData.creatorId
            )
            .then((response) => {
              this.dataUser = response.data
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListUser() {
      axios
        .get(this.$store.state.MainLink + "UserGroup/GetAllMember/" + this.item)
        .then((response) => {
          this.listUser = response.data;
          for (let index = 0; index < response.data.length; index++) {
            this.listUserUpdate = response.data[index].user;
          }

          // console.log(this.listUserUpdate);
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
      this.listUserUpdate.push(item)
    },
    deleteUser(userId, groupId) {
      axios
        .delete(
          this.$store.state.MainLink + "UserGroup/Delete/" + groupId + "?groupId=" + groupId + "&userId=" + userId
        )
        .then((response) => {
          alert("Xóa thành công!");
          this.getListUser();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    UpdateListUser() {
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
    }
  },
};
</script>

<style scoped>
.Title-font-size {
  font-weight: 600;
}
</style>
