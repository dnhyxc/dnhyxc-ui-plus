<template>
  <div class="wrap">
    <div class="demo-list">
      <div class="coms">
        <n-button type="success" size="large" color="#f5f5f5" :on-click="onClick" />
        <n-button type="success" size="small" color="#f5f5f5" :on-click="onClick" />
        <n-icon name="sea" size="28" />
        <n-icon name="ai" size="100" />
        <n-icon name="wechat-program" />
        <n-icon name="pause-play" />
        <n-icon name="pause-play-fill" class-name="play-fill-icon" />

        <el-button type="primary">element-plus</el-button>
        <el-checkbox v-model="checked" />
        <el-tag type="primary">Tag 1</el-tag>
      </div>
      <n-emoji
        v-model:visible="showEmoji"
        :on-select="onAddEmoji"
        :col="15"
        :gap="5"
        :init-show-emoji-count="30"
        :excludeEmoji="['[爆筋]']"
      />
      <n-input
        ref="inputRef"
        v-model:value="keyword"
        size="large"
        placeholder="请输入!!!"
        @keypress.enter="onKeypress"
      />
      <n-button
        type="primary"
        style="margin: 20px 0"
        @click="
          () => {
            console.log(imgList.value, 'click');
            onPreview(
              {
                id: '1',
                url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
              },
              [
                {
                  id: '1',
                  url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
                },
                {
                  id: '2',
                  url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
                },
                {
                  id: '3',
                  url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
                },
                {
                  id: '4',
                  url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
                },
                {
                  id: '5',
                  url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
                }
              ]
            );
          }
        "
        >查看图片</n-button
      >
      <div class="image-list">
        <n-image
          url="https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
          width="100px"
          height="auto"
          radius="8px"
          placeholderImg="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5g57w1.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
          :on-click="
            () => {
              onPreview(
                {
                  url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
                },
                []
              );
            }
          "
        />
        <n-image
          url="https://files.codelife2.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
          width="100px"
          height="100px"
          radius="8px"
          errorText="加载失败了"
          placeholderImg="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5g57w1.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
          :on-click="
            () => {
              onPreview(
                {
                  url: 'https://files.codelife2.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
                },
                []
              );
            }
          "
        />
        <n-image
          url="https://files.codelife1.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
          radius="8px"
          width="100px"
          height="100px"
          loadingText="正在加载中"
        />
        <n-image url="" width="100px" height="100px" radius="8px" emptyText="没有图片" />
        <n-image
          url=""
          placeholderImg="https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
          width="100px"
          height="100px"
          radius="8px"
          emptyText="没有图片"
        />
        <n-image-preview
          v-model:visible="previewVisible"
          closeOnClickModal
          :selected-image="selectedImage"
          :imageList="imgList"
          show-download
          width="70vw"
          :getImgSizeFromUrl="getImgSizeFromUrl"
        />
      </div>
      <n-image-contrast
        beforeImg="https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
        afterImg="https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      />
      <n-model v-model:visible="visible1" title="弹窗1" alignCenter>
        <template #content>
          <div class="content">弹窗1内容</div>
        </template>
      </n-model>
      <n-model v-model:visible="visible2" :show-close="false" draggable>
        <!-- 自定义标题透传的 close, titleId, titleClass 参数-->
        <template #header="{ close, titleId, titleClass }">
          <div class="header">
            <div class="title">弹窗2</div>
            <n-icon name="close" size="18" @click="close" color="#333" cursor="pointer" hoverColor="skyblue" />
          </div>
        </template>
        <template #content>
          <div class="content">弹窗2内容</div>
        </template>
        <template #footer>
          <div class="footer">
            <n-button type="primary" @click="visible2 = false">确定</n-button>
            <n-button class="close-btn" @click="visible2 = false">取消</n-button>
          </div>
        </template>
      </n-model>
      <div class="button-group">
        <n-button type="primary" @click="visible1 = true">打开弹窗1</n-button>
        <n-button type="primary" @click="visible2 = true">打开弹窗2</n-button>
      </div>
      <div style="height: 500px">
        <Waterfall />
      </div>
    </div>
    <div class="demo-input">
      <DraftInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { notification, type EmojiName } from '@dnhyxc-ui/components';
import { notification, type EmojiName } from 'dnhyxc-ui-vue-plus';
import Waterfall from './Waterfall.vue';
import DraftInput from './components/DraftInput.vue';

const keyword = ref('');
const inputRef = ref();
const checked = ref(true);
const showEmoji = ref(true);
const previewVisible = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);

const imgList = ref<any>([]);
const selectedImage = ref<any>({});

const onPreview = (image: any, imgs: any[]) => {
  imgList.value = imgs;
  previewVisible.value = true;
  selectedImage.value = image;
};

const onSelect = (key: EmojiName) => {
  console.log(key, 'onSelect');
};

onSelect('[爆筋]');

const onKeypress = () => {
  console.log('keypress', keyword.value);
  console.log(inputRef.value.inputRef, 'inputRef');
};

const onClick = (e: MouseEvent) => {
  console.log(e, 'click');
  notification({
    title: '提示',
    message: '这是一条提示消息',
    type: 'success'
  });
};

const onAddEmoji = (key: string) => {
  console.log(key, 'onAddEmoji');
};

const getImgSizeFromUrl = async (
  url: string
): Promise<{
  type: string;
  size: number;
}> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type.split('/').pop() as string;
    const sizeInBytes = blob.size;
    const sizeInKB = sizeInBytes / 1024;
    return {
      type,
      size: sizeInKB
    };
  } catch (error) {
    return {
      type: '',
      size: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  overflow: auto;

  .demo-list {
    padding: 10px;
  }

  .demo-input {
    margin-top: 50px;
  }
}

.coms {
  display: flex;
  align-items: center;

  .play-fill-icon {
    cursor: pointer;
  }
}

.image-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  .n-image {
    // 默认样式，可以通过修改默认样式来修改组件的样式
    // --image-object-position: top left;
    // --image-hover-object-position: bottom right;
    // --image-empty-bg: #f5f7fa;
    // --image-object-fit: cover;
    // --image-transition: all 0.3s ease-in-out;
    // --image-loading-bg: #f5f7fa;
    // --image-loading-text-color: #ccc;
    // --image-empty-text-color: #ccc;
    // --image-font-size: 14px; // 控制 loading、empty、加载失败的文字大小

    --image-loading-text-color: #333;
    --image-empty-text-color: #333;
    --image-empty-bg: rgb(226, 222, 222);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 300px;
}

.footer {
  display: flex;
  justify-content: flex-end;

  .close-btn {
    margin-left: 10px;
  }
}

.button-group {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .n-button {
    margin-right: 10px;
  }
}
</style>
