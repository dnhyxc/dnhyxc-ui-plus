<!--
 * 
 * @author: dnhyxc
 * @since: 2025-11-13
 * index.vue
-->
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
                      need-at
                      :at-user-list="atUsers"
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
                need-at
                :at-user-list="atUsers"
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
        need-at
        :at-user-list="atUsers"
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
import { type DefineExposeOptions } from 'dnhyxc-ui-vue-plus';
import { replaceCommentContent } from './utils';

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
const placeholder = ref('请输入内容');
const replyPlaceholder = ref('请输入内容');
const disabled = ref(false);
const maxlength = ref(1000);
const draftInputRef = ref<DefineExposeOptions>();
const chatList = ref<Message[]>([]);
const isReply = ref(false);
const replyId = ref('');

let timer: ReturnType<typeof setTimeout> | null = null;

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

const setDraftInputRef = (ref: any) => {
  draftInputRef.value = ref;
};

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
});
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
      height: 300px;
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
    }
  }
}
</style>
