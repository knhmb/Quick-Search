<template>
  <div class="left-section">
    <base-card>
      <div class="content">
        <div class="single-content">
          <p class="title">篩選條件</p>
          <img src="../../assets/arrowhead-down@2x.png" alt="" />
        </div>
        <div class="single-content">
          <p>地區</p>
          <img src="../../assets/chevron-up-black@2x.png" alt="" />
        </div>
        <div class="single-content checkboxes">
          <!-- <el-checkbox>港島區</el-checkbox> -->
          <el-tree accordion :data="data" :props="defaultProps" show-checkbox>
            <template #default="{ node }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <!-- <span> -->
                <img src="../../assets/chevron-down-black@2x.png" alt="" />
                <!-- </span> -->
              </span>
            </template>
          </el-tree>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
        disabled: "disabled",
      },
      data: [
        {
          id: 1,
          label: "港島區",
          children: [
            {
              id: 2,
              label: "青衣站",
            },
            {
              id: 3,
              label: "欣澳站",
              disabled: false,
            },
            {
              id: 4,
              label: "迪士尼站",
              disabled: false,
            },
            {
              id: 5,
              label: "東涌站",
              disabled: false,
            },
            {
              id: 6,
              label: "機場站",
              disabled: false,
            },
            {
              id: 7,
              label: "博覽館站",
              disabled: false,
            },
          ],
        },
        {
          id: 2,
          label: "九龍區",
          children: [
            {
              id: 2,
              label: "青衣站",
            },
            {
              id: 3,
              label: "欣澳站",
              disabled: false,
            },
            {
              id: 4,
              label: "迪士尼站",
              disabled: false,
            },
            {
              id: 5,
              label: "東涌站",
              disabled: false,
            },
            {
              id: 6,
              label: "機場站",
              disabled: false,
            },
            {
              id: 7,
              label: "博覽館站",
              disabled: false,
            },
          ],
        },
        {
          id: 3,
          label: "新界區",
          children: [
            {
              id: 2,
              label: "青衣站",
            },
            {
              id: 3,
              label: "欣澳站",
              disabled: false,
            },
            {
              id: 4,
              label: "迪士尼站",
              disabled: false,
            },
            {
              id: 5,
              label: "東涌站",
              disabled: false,
            },
            {
              id: 6,
              label: "機場站",
              disabled: false,
            },
            {
              id: 7,
              label: "博覽館站",
              disabled: false,
            },
          ],
        },
        {
          id: 4,
          label: "離島區",
          children: [
            {
              id: 2,
              label: "青衣站",
            },
            {
              id: 3,
              label: "欣澳站",
              disabled: false,
            },
            {
              id: 4,
              label: "迪士尼站",
              disabled: false,
            },
            {
              id: 5,
              label: "東涌站",
              disabled: false,
            },
            {
              id: 6,
              label: "機場站",
              disabled: false,
            },
            {
              id: 7,
              label: "博覽館站",
              disabled: false,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.left-section p.title {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  font-feature-settings: "liga" off;
  color: #393939;
}

.left-section .single-content {
  margin-bottom: 0.5rem;
}

.left-section .single-content p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #6f6f6f;
}

.left-section .single-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.left-section .single-content.checkboxes {
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0.1px;
  padding-bottom: 1rem;
}

.left-section .single-content img {
  width: 1.5rem;
  display: none;
}

.left-section :deep(.is-penultimate img) {
  display: block;
}

.left-section .el-tree {
  padding-left: 1rem;
  width: 100%;
}

.left-section :deep(.el-tree .el-icon) {
  display: none;
}

.left-section .single-content :deep(.custom-tree-node) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.left-section
  .single-content
  :deep(.el-tree-node__children .el-tree-node__content .custom-tree-node img) {
  display: none;
}

.left-section
  .single-content
  :deep(.el-tree-node__content .custom-tree-node img) {
  display: block;
}

/* .left-section
  .single-content
  :deep(.el-tree-node__content:nth-of-type(2) .custom-tree-node img) {
  display: block;
} */
</style>