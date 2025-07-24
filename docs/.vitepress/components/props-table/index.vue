<template>
  <table>
    <thead>
      <tr>
        <th style="width: 200px">名称</th>
        <th style="width: 1200px">说明</th>
        <th style="width: 1000px">类型</th>
        <th style="width: 300px">默认值</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prop in data" :key="prop.name">
        <td>{{ prop.name }}</td>
        <td>{{ prop.description }}</td>
        <td>
          <code>{{ prop.type }}</code>
          <el-tooltip v-if="prop.typeEnum" placement="top" effect="light" trigger="hover" popper-class="props-tooltip">
            <template #content>
              <div class="tag-list">
                <span
                  v-for="(type, index) in prop.typeEnum"
                  :key="type"
                  disable-transitions
                  :class="`tag tag-${index}`"
                >
                  {{ type }}
                </span>
              </div>
            </template>
            <n-icon
              name="info"
              color="var(--vp-code-color)"
              style="cursor: pointer; vertical-align: text-top; margin-left: 5px; margin-top: -1px"
            />
          </el-tooltip>
        </td>
        <td>
          <code v-if="prop.default">{{ prop.default }}</code>
          <span v-else>-</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineOptions({
  name: 'n-props-table'
});

interface IProps {
  data: {
    name: string;
    type: string;
    default: string;
    description: string;
    typeEnum?: string[];
  }[];
}

defineProps<IProps>();
</script>

<style scoped lang="scss">
.tag-list {
  .tag {
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: var(--vp-code-bg);
    padding: 0 6px;
    border-radius: 4px;
    color: var(--vp-code-color);
    display: inline-block;
  }
}
</style>
