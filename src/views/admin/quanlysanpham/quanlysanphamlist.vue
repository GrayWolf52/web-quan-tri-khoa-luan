<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách nhóm</p>
        <p class="Text-tile-2">Trang chủ ● nhóm</p>
      </div>
      <div class="col-md-6 float-right">
        <button type="button" class="btn btn-primary float-right btn-add" @click="CreateNewProduct()">
          <i class="cil-plus"></i>
          Thêm mới
        </button>
      </div>
    </div>
    <!-- <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand"></a>
      <form class="form-inline">
        <input @change="searchProduct()" class="form-control mr-sm-2" type="search" placeholder="Search"
          aria-label="Search" style="box-shadow: none" v-model="searchString" />
      </form>
    </nav> -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col" class="Title-table" colspan="1">Tên nhóm</th>
          <th class="Title-table"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getData" :key="index">
          <th>{{ item.id }}</th>
          <th scope="row" class="td-table">{{ item.groupName }}</th>
          <td class="td-table td-action">
            <button type="button" class="btn btn-primary btn-size" @click="DetailProduct(item.id)">
              <i class="cil-folder-open"></i>
            </button>
            <button type="button" class="btn btn-danger btn-size" @click="deleteProduct(item.id)">
              <i class="cil-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamList",
  data() {
    return {
      getData: "",
      formData: {
        name: "",
        price: "",
        status: "",
        orderDetails: "",
        blogs: "",
        productCategories: "",
        sales: "",
        productColors: [],
        cartDetails: "",
        productDetails: [],
      },
      searchString: "",
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    searchProduct() {
      axios
        .get(
          this.$store.state.MainLink + "admin/products?find="
        )
        .then((response) => {
          this.getData = response.data.object;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    CreateNewProduct() {
      this.$router.push("/admin/quanlysanphamcreate");
    },
    UpdateProduct() {
      this.$router.push("/admin/quanlysanphamcreatedetail");
    },
    DetailProduct(id) {
      this.$router.push({
        name: "Thông tin chi tiết sản phẩm",
        params: { item: id },
      });
    },
    deleteProduct(item) {
      axios
        .delete(
          this.$store.state.MainLink + "Group/Delete/" + item
        )
        .then((response) => {
          alert("Delete thành công.");
          this.getAllProduct();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    Status(products) {
      switch (products.status) {
        case "Đang bán":
          return "green";
        case "Không kinh doanh":
          return " gray";
        case "Hàng sắp về":
          return "black";
        case "Chưa có":
          return " orange";
        case "Hết hàng":
          return " red";
      }
    },
    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "Group/GetAll")
        .then((response) => {
          this.getData = response.data;
          // console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
</style>
