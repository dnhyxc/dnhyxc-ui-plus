# DraftInput 多功能输入框

## 使用指南

全局注册

:::demo

```vue
<template>
  <div class="draft-input-demo">
    <n-draft-input
      :ref="draftInputRef"
      class-name="custom-draft-input"
      autofocus
      :placeholder="placeholder"
      resize="none"
      :disabled="disabled"
      :maxlength="maxlength"
      @submit="onSubmit"
      @enter="onEnter"
      @beforeUpload="onBeforeUpload"
      @upload="onUpload"
    />
    <n-draft-input
      autofocus
      class-name="custom-draft-input"
      :placeholder="placeholder"
      resize="none"
      :disabled="disabled"
      :maxlength="maxlength"
      @submit="onSubmit"
      @enter="onEnter"
      @beforeUpload="onBeforeUpload"
      @upload="onUpload"
    >
      <template #actions>
        <div class="actions">
          <n-icon name="in-clip" cursor="pointer" @click="() => console.log('in-clip')" />
        </div>
      </template>
    </n-draft-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type DefineExposeOptions } from 'dnhyxc-ui-plus';

const minRows = ref(5);
const placeholder = ref('请输入内容');
const disabled = ref(false);
const maxlength = ref(1000);
const draftInputRef = ref<DefineExposeOptions>();

const onSubmit = (value: string) => {
  console.log('onSubmit', value);
};

const onEnter = (value: string) => {
  console.log('onEnter', value);
};

const onBeforeUpload = (file: File) => {
  console.log('onBeforeUpload', file);
  // 这里自行进行文件校验
  return true;
};

const onUpload = async (file: File) => {
  const img = `https://picsum.photos/1080/${500 + Math.floor(Math.random() * 300)}`;
  const url = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(img);
    }, 100);
  });
  return url;
};
</script>

<style lang="scss" scoped>
.draft-input-demo {
  .custom-draft-input {
    margin-top: 20px !important;
  }
}
</style>
```

:::

局部注册

:::demo

```vue
<template>
  <div class="draft-input-demo">
    <DraftInput
      :ref="draftInputRef"
      autofocus
      :placeholder="placeholder"
      resize="none"
      :disabled="disabled"
      :maxlength="maxlength"
      @submit="onSubmit"
      @enter="onEnter"
      @beforeUpload="onBeforeUpload"
      @upload="onUpload"
    />
    <DraftInput
      class-name="custom-draft-input"
      autofocus
      :placeholder="placeholder"
      resize="none"
      :disabled="disabled"
      :maxlength="maxlength"
      @submit="onSubmit"
      @enter="onEnter"
      @beforeUpload="onBeforeUpload"
      @upload="onUpload"
    >
      <template #actions>
        <div class="actions">
          <Icon name="in-clip" cursor="pointer" @click="() => console.log('in-clip')" />
        </div>
      </template>
    </DraftInput>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DraftInput, Icon, type DefineExposeOptions } from 'dnhyxc-ui-plus';

const minRows = ref(5);
const placeholder = ref('请输入内容');
const disabled = ref(false);
const maxlength = ref(1000);
const draftInputRef = ref<DefineExposeOptions>();

const onSubmit = (value: string) => {
  console.log('onSubmit', value);
};

const onEnter = (value: string) => {
  console.log('onEnter', value);
};

const onBeforeUpload = (file: File) => {
  console.log('onBeforeUpload', file);
  // 这里自行进行文件校验
  return true;
};

const onUpload = async (file: File) => {
  const img = `https://picsum.photos/1080/${500 + Math.floor(Math.random() * 300)}`;
  const url = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(img);
    }, 100);
  });
  return url;
};
</script>

<style lang="scss" scoped>
.draft-input-demo {
  .custom-draft-input {
    margin-top: 20px !important;
  }

  .actions {
    height: 40px;
  }
}
</style>
```

:::

输入框 @ 功能

:::demo

```vue
<template>
  <div class="draft-input-demo">
    <div>通过传递 atUserList 参数实现</div>
    <DraftInput
      class-name="custom-draft-input"
      autofocus
      need-at
      :at-user-list="atUsers"
      :placeholder="placeholder"
      resize="none"
      :disabled="disabled"
      :maxlength="maxlength"
      @submit="onSubmit"
      @enter="onEnter"
      @beforeUpload="onBeforeUpload"
      @upload="onUpload"
      @atUser="onAtUser"
    />
    <div class="at-title">通过 at-users 插槽实现</div>
    <DraftInput
      class-name="custom-draft-input"
      autofocus
      :placeholder="placeholder"
      resize="none"
      need-at
      :disabled="disabled"
      :maxlength="maxlength"
      @submit="onSubmit"
      @enter="onEnter"
      @beforeUpload="onBeforeUpload"
      @upload="onUpload"
      @atUser="onAtUser"
    >
      <template #at-users="{ onSelectUser }">
        <div class="at-list">
          <el-scrollbar max-height="300px">
            <div v-for="user in atUsers" :key="user.id" class="at-item" @click="onSelectUser(user)">
              <div class="at-item-info">
                <div class="at-item-avatar">
                  <Image
                    url="https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
                    width="40px"
                    height="40px"
                  />
                </div>
                <div class="at-item-username">{{ user.username }}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </template>
    </DraftInput>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DraftInput, Icon, Image, type DefineExposeOptions, type AtUserOptions } from 'dnhyxc-ui-plus';

const minRows = ref(5);
const placeholder = ref('请输入内容');
const disabled = ref(false);
const maxlength = ref(1000);
const draftInputRef = ref<DefineExposeOptions>();
const atUsers = [
  {
    id: 1,
    username: 'user_1',
    avatar:
      'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 2,
    username: 'user_2',
    avatar:
      'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 3,
    username: 'user_3',
    avatar:
      'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 4,
    username: 'user_4',
    avatar:
      'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 5,
    username: 'user_5',
    avatar:
      'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 6,
    username: 'user_6',
    avatar:
      'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 7,
    username: 'user_7',
    avatar:
      'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 8,
    username: 'user_8',
    avatar:
      'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 9,
    username: 'user_9',
    avatar:
      'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 10,
    username: 'user_10',
    avatar:
      'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 11,
    username: 'user_11',
    avatar:
      'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 12,
    username: 'user_12',
    avatar:
      'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 13,
    username: 'user_13',
    avatar:
      'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 14,
    username: 'user_14',
    avatar:
      'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: 15,
    username: 'user_15',
    avatar:
      'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  }
];

const onSubmit = (value: string) => {
  console.log('onSubmit', value);
};

const onEnter = (value: string) => {
  console.log('onEnter', value);
};

const onBeforeUpload = (file: File) => {
  console.log('onBeforeUpload', file);
  // 这里自行进行文件校验
  return true;
};

const onUpload = async (file: File) => {
  const img = `https://picsum.photos/1080/${500 + Math.floor(Math.random() * 300)}`;
  const url = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(img);
    }, 100);
  });
  return url;
};

const onAtUser = (user: AtUserOptions) => {
  console.log('onAtUser', user);
};
</script>

<style lang="scss" scoped>
.draft-input-demo {
  .at-title {
    margin-top: 20px;
  }

  .custom-draft-input {
    margin-top: 20px !important;
  }

  .actions {
    height: 40px;
  }
}

.at-list {
  --draft-input-at-user-hover-bg: #ffffff1a;
  --draft-input-at-user-hover-color: rgb(180, 255, 180);

  width: 300px;
  height: auto;

  .at-item {
    padding: 2px 8px 2px 0;
    cursor: pointer;

    .at-item-info {
      display: flex;
      align-items: center;
      padding: 4px;
      border-radius: 5px;

      &:hover {
        color: var(--draft-input-at-user-hover-color);
        background-color: var(--draft-input-at-user-hover-bg);
      }

      .at-item-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .at-item-username {
        display: flex;
        align-items: center;
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>
```

:::

具体使用示例

:::demo

```vue
<template>
  <div class="chat-wrap">
    <div class="chat-content-wrap">
      <el-scrollbar>
        <div class="chat-content">
          <div v-for="chat in chatList" class="chat-info">
            <div class="chat-list">
              <div class="chat-item-wrap">
                <div class="chat-item-content">
                  <div class="chat-item">
                    <div class="user-info">{{ chat.username }}：</div>
                    <div class="chat-msg" v-html="replaceCommentContent(chat.content)" />
                  </div>
                </div>
                <div>
                  <n-button
                    type="primary"
                    link
                    class="reply"
                    @click.stop="() => onReply(chat, isReply && replyId === chat.id)"
                  >
                    {{ isReply && replyId === chat.id ? '取消回复' : '回复' }}
                  </n-button>
                  {{ chat.time }}
                </div>
              </div>
              <div v-if="chat.replyList" class="reply-chat-info">
                <div v-for="replyChat in chat.replyList">
                  <div class="reply-chat-item-wrap">
                    <div class="chat-item-content">
                      <div class="chat-item">
                        <div class="user-info">{{ replyChat.username }} 回复 {{ replyChat?.replyUser }}：</div>
                        <div class="chat-msg" v-html="replaceCommentContent(replyChat.content)" />
                      </div>
                    </div>
                    <div>
                      <n-button
                        type="primary"
                        link
                        class="reply"
                        @click.stop="() => onReply(replyChat, isReply && replyId === replyChat.id)"
                      >
                        {{ isReply && replyId === replyChat.id ? '取消回复' : '回复' }}
                      </n-button>
                      {{ replyChat.time }}
                    </div>
                  </div>
                  <div v-if="isReply && replyId === replyChat.id" id="REPLY_INPUT" class="draft-input-wrap reply-input">
                    <n-draft-input
                      :ref="setDraftInputRef"
                      autofocus
                      :min-rows="minRows"
                      :placeholder="replyPlaceholder"
                      resize="none"
                      :disabled="disabled"
                      :maxlength="maxlength"
                      @submit="onSubmit"
                      @enter="onEnter"
                      @beforeUpload="beforeUpload"
                      @upload="onUpload"
                    >
                    </n-draft-input>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isReply && replyId === chat.id" class="draft-input-wrap reply-input">
              <n-draft-input
                :ref="setDraftInputRef"
                autofocus
                :min-rows="minRows"
                :placeholder="replyPlaceholder"
                resize="none"
                :disabled="disabled"
                :maxlength="maxlength"
                @submit="onSubmit"
                @enter="onEnter"
                @beforeUpload="beforeUpload"
                @upload="onUpload"
              >
              </n-draft-input>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="draft-input-wrap">
      <n-draft-input
        ref="draftInputRef"
        autofocus
        :min-rows="minRows"
        :placeholder="placeholder"
        resize="none"
        :disabled="disabled"
        :maxlength="maxlength"
        @submit="onSubmit"
        @enter="onEnter"
        @beforeUpload="beforeUpload"
        @upload="onUpload"
      >
      </n-draft-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onUnmounted } from 'vue';
// import { ElMessage } from 'element-plus';
import { type DefineExposeOptions, EMOJI_NAME, EMOJI_MAP } from 'dnhyxc-ui-plus';

interface Message {
  id: string;
  content: string;
  time: string;
  username: string;
  fromId?: string;
  replyUser?: string;
  replyList?: Message[];
}

const minRows = ref(3);
const placeholder = ref('请输入内容，Enter 发送，Shift + Enter 换行');
const replyPlaceholder = ref('请输入内容，Enter 发送，Shift + Enter 换行');
const disabled = ref(false);
const maxlength = ref(1000);
const draftInputRef = ref<DefineExposeOptions>();
const chatList = ref<Message[]>([]);
const isReply = ref(false);
const replyId = ref('');

let timer: ReturnType<typeof setTimeout> | null = null;

const setDraftInputRef = (ref: any) => {
  draftInputRef.value = ref;
};

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
});

const ERROR_IMG =
  'https://files.codelife.cc/wallhaven/full/4g/wallhaven-4gj2q4.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp';

// 处理输入的换行符
const replaceCommentContent = (content = '') => {
  const context = content.replace(/\n/g, '<br/>');
  return replaceEmojis(context);
};

// 表情包转换
const replaceEmojis = (content = '') => {
  content = content.replace(/\[[^[^\]]+]/g, (word) => {
    const index = (EMOJI_NAME as readonly string[]).indexOf(word);
    if (index > -1) {
      const src = `${EMOJI_MAP[word as keyof typeof EMOJI_MAP]}`;
      return `<img id="__COMMENT_EMOJI__" style="vertical-align: middle;width: 32px;height: 32px" src="${src}" alt="" title="${word}"/>`;
    } else {
      return word;
    }
  });
  return replacePictures(content);
};

// 图片转换
const replacePictures = (content = '') => {
  content = content.replace(/\[[^<^>]+\]/g, (word) => {
    const index = word.indexOf(',');
    if (index > -1) {
      const arr = word.replace('<', '').replace('>', '').split(',');
      return `
        <img
          id="__COMMENT_IMG__"
          style="border-radius: 5px;
          width: 100%;
          max-width: 250px;
          height:auto;
          display: block;
          padding: 5px 0;
          cursor: pointer;
          -webkit-user-drag: none;
          user-select: none;"
          src="${arr[1]}"
          title="${arr[0]}"
          alt=""
          onerror="this.onerror=null;this.src='${ERROR_IMG}';this.title='图片加载失败';this.className='error-img';"
        />
      `;
    } else {
      return word;
    }
  });
  return wordToLink(content);
};

const wordToLink = (content: string) => {
  if (checkHref(content)) {
    return `<a style="color: #2b7de7; cursor: pointer; word-break: break-all; text-decoration: none;" href="${content}" target="_blank" rel="noopener noreferrer">${content}</a>`;
  }
  return content;
};

// 校验是否是有效的链接
const checkHref = (url: string) => {
  const Expression =
    /^(https?:\/\/)?(([0-9a-z.]+\.[a-z]+)|(([0-9]{1,3}\.){3}[0-9]{1,3}))(:[0-9]+)?(\/[0-9a-z%/.\-_]*)?(\?[0-9a-z=&%_-]*)?(#[0-9a-z=&%_-]*)?/gi;
  const objExp = new RegExp(Expression);
  return objExp.test(url);
};

const onSubmit = (value: string) => {
  let replyMsg = null;

  // 查找要回复的消息（支持主消息或子回复）
  const parentMsg = chatList.value.find((item) => item.id === replyId.value);

  if (!parentMsg) {
    replyMsg = chatList.value.find((top) => top.replyList?.some((r) => r.id === replyId.value));
  } else {
    replyMsg = parentMsg;
  }

  const findMsg =
    parentMsg || chatList.value.flatMap((top) => top.replyList || []).find((r) => r?.id === replyId.value);

  const newReply: Message = {
    id: Math.random().toString(36).slice(2),
    content: value,
    time: new Date().toLocaleDateString('zh-CN'),
    username: `user_${Math.random().toString(36).slice(2, 8)}`,
    fromId: replyId.value,
    replyUser: findMsg?.username || ''
  };

  if (replyMsg) {
    // 确保 replyList 存在
    replyMsg.replyList = replyMsg.replyList || [];
    replyMsg.replyList.unshift(newReply);
  } else {
    // 无回复目标，作为新主消息
    chatList.value.unshift({
      id: Math.random().toString(36).slice(2),
      content: value,
      time: new Date().toLocaleDateString('zh-CN'),
      username: `user_${Math.random().toString(36).slice(2, 8)}`
    });
  }
  placeholder.value = '请输入内容';
  isReply.value = false;
  replyId.value = '';
};
const onEnter = (e: any) => {
  console.log('onEnter', e);
};

const beforeUpload = (file: File) => {
  console.log('beforeUpload--', file);
  // ElMessage({
  //   message:'格式不符合',
  //   type: 'error'
  // });
  return true;
};

const onUpload = async (file: File) => {
  console.log('onUpload-----', file);
  const img = `https://picsum.photos/1080/${500 + Math.floor(Math.random() * 300)}`;
  const url = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(img);
    }, 100);
  });
  return url;
};

const onReply = (chat: Message, reply: boolean) => {
  isReply.value = false;
  nextTick(() => {
    replyPlaceholder.value = `回复 ${chat.username}`;
    replyId.value = chat.id;
    isReply.value = !reply;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      draftInputRef.value?.inputRef?.focus();
    });
  });
};
</script>

<style scoped lang="scss">
.chat-wrap {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;

  .chat-content-wrap {
    flex: 1;
    margin-bottom: 20px;
    box-sizing: border-box;

    .chat-content {
      height: 200px;
      box-sizing: border-box;

      .chat-info {
        display: flex;
        flex-direction: column;

        .chat-list {
          display: flex;
          flex-direction: column;
          word-break: break-all;
          margin-bottom: 10px;

          .chat-item-wrap {
            display: flex;
            align-items: flex-end;
          }

          .reply-chat-info {
            margin-left: 10px;
            border: 1px solid #cccccc26;
            margin-top: 10px;
            padding: 5px 10px 0;
            border-radius: 5px;

            .reply-chat-item-wrap {
              display: flex;
              align-items: flex-end;
              margin-bottom: 10px;
            }
          }

          .chat-item-content {
            display: flex;
            flex: 1;
          }

          .chat-item {
            display: flex;
            align-items: flex-start;
            margin-right: 10px;

            .user-info {
              color: #bebebe;
            }

            .chat-msg {
              flex: 1;
              display: flex;
              align-items: flex-start;

              img {
                margin-left: 5px;
              }
            }
          }
        }

        .reply-input {
          margin-bottom: 12px;
        }
      }
    }
  }

  .draft-input-wrap {
    height: 150px;
    min-height: 150px;

    .n-draft-input {
      --draft-input-border-color: rgb(229, 255, 209);
      --draft-input-border-radius: 5px;
      --draft-input-color: rgb(229, 255, 209);
      --draft-input-smile-icon-hover-color: rgb(199, 255, 156);
      margin-top: 20px;
    }
  }
}
</style>
```

:::

## API

### Model Props

<script>
const data = [
  {
    name: 'height',
    type: 'string',
    default: '120px',
    description: '输入框整体高度',
  },
  {
    name: 'className',
    type: 'string',
    default: '',
    description: '输入框自定义样式名称',
  },
  {
    name: 'autofocus',
    type: 'boolean',
    default: 'false',
    description: '是否自动获取焦点',
  },
    {
    name: 'placeholder',
    type: 'string',
    default: '',
    description: '输入框占位符',
  },
  {
    name: 'resize',
    type: 'enum',
    default: 'none',
    description: '',
    typeEnum: ['none', 'vertical', 'horizontal', 'both']
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: '',
    description: '输入框是否禁用',
  },
  {
    name: 'maxlength',
    type: 'number',
    default: '',
    description: '输入框最大长度',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: '',
    description: '输入框图片上传操作是否支持多文件上传',
  },
  {
    name: 'accept',
    type: 'string',
    default: '',
    description: '文件类型筛选',
  },
  {
    name: 'fileTypes',
    type: 'string[]',
    default: '',
    description: '上传支持的文件类型',
  },
  {
    name: 'uploadInfoMsg',
    type: 'string',
    default: '',
    description: '文件上传类型错误时的提示信息',
  },
  {
    name: 'maxFileSize',
    type: 'number',
    default: '',
    description: '文件上传最大文件大小限制',
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    default: '',
    description: '输入框内容变化时触发',
  },
  {
    name: 'onSubmit',
    type: '(value: string) => void',
    default: '',
    description: 'enter 键按下时触发',
  },
  {
    name: 'onEnter',
    type: '(e: KeyboardEvent) => void',
    default: '',
    description: 'enter 键 + shift 键按下时触发',
  },
    {
    name: 'onFocus',
    type: '(e: FocusEvent) => void',
    default: '',
    description: '输入框获取焦点时触发',
  },
  {
    name: 'onBlur',
    type: '(e: FocusEvent) => void',
    default: '',
    description: '文件上传最大文件大小限制',
  },
  {
    name: 'onBeforeUpload',
    type: '(file: File) => boolean',
    default: '',
    description: '文件上传前触发，返回 false 则不进行上传',
  },
  {
    name: 'onUpload',
    type: '(file: File) => Promise<string>',
    default: '',
    description: '文件上传成功时触发，需要返回文件地址',
  }
];

const slots = [
  {
    name: 'actions',
    description: '自定义输入框头部操作',
  },
  {
    name: 'smile-icon',
    description: '自定义头部表情操作图标',
  },
  {
    name:'upload-icon',
    description: '自定义头部上传操作图标',
  },
]

const cssVars = [
  {
    name: '--draft-input-border-color',
    description: '输入框边框颜色',
  },
  {
    name: '--draft-input-border-radius',
    description: '输入框边框圆角',
  },
  {
    name:'--draft-input-bg',
    description: '输入框背景颜色',
  },
  {
    name:'--draft-input-color',
    description: '输入框字体颜色',
  },
  {
    name:'--draft-input-smile-icon-hover-color',
    description: '输入框头操作鼠标移入时图标颜色',
  },
  {
    name:'--draft-input-disabled-color',
    description: '输入框禁用时字体颜色',
  },
  {
    name:'--draft-input-disabled-bg',
    description: '输入框禁用时背景颜色',
  },
]
</script>

<props-table :data="data" />

### DraftInput Slots

<props-table :data="slots" name-text="插槽名称" :show-type="false" :show-default="false" />

### DraftInput CSS Variables

<props-table :data="cssVars" name-text="CSS 变量" :show-type="false" :show-default="false" />

CSS 变量使用说明：

可直接在组件中使用组件的类名 `.n-draft-input` 进行覆盖，例如：

```css[css]
.draft-input-wrap {
  .n-draft-input {
    --draft-input-border-color: rgb(229, 255, 209);
    --draft-input-border-radius: 5px;
    --draft-input-color: rgb(229, 255, 209);
    --draft-input-smile-icon-hover-color: rgb(199, 255, 156);
  }
}
```
