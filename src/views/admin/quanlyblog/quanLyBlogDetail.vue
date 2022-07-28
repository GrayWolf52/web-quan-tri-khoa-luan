<template>
    <div>
        <CRow>
            <CCol md="12" lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-justify-center" />
                        <strong> Thông tin sự kiện </strong>
                    </CCardHeader>
                    <CCardBody height="auto">
                        <CListGroup>
                            <CListGroupItem>
                                <span class="Title-font-size">Mã sự kiện : </span>
                                <span>{{ getData.id }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Tên sự kiên : </span>
                                <span>{{ getData.title }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Mô tả : </span>
                                <span>{{ getData.description }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Thời gian bắt đầu : </span>
                                <span>{{ getData.startTime }}</span>
                            </CListGroupItem>
                            <CListGroupItem>
                                <span class="Title-font-size">Thời gian kết thúc : </span>
                                <span>{{ getData.endTime }}</span>
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

            formCollapsed: true,
        };
    },
    created() {
        this.getDetailProduct();
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        validator(val) {
            return val ? val.length >= 4 : false;
        },
        CancelCreate() {
            this.$router.push("/quanlysanphamlist");
        },
        UpdateProduct() {
            this.$router.push("/quanlysanphamupdate");
        },
        getDetailProduct() {
            axios
                .get(this.$store.state.MainLink + "Event/" + this.item)
                .then((response) => {
                    this.getData = response.data;
                    console.log(this.getData);
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
