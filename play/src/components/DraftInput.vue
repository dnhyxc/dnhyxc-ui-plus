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
import { ref, nextTick, onUnmounted, onMounted } from 'vue';
// import { ElMessage } from 'element-plus';
import { type DefineExposeOptions } from '@dnhyxc-ui/components';
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

const setDraftInputRef = (ref: any) => {
  draftInputRef.value = ref;
};

onMounted(() => {
  window.addEventListener('click', onClickElement);
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  window.removeEventListener('click', onClickElement);
});

const onClickElement = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const replyInputEls = document.querySelectorAll('.reply-input');
  if (replyInputEls?.[0] && !replyInputEls?.[0].contains(target)) {
    isReply.value = false;
  }
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
  const img = `https://picsum.photos/1080/${500 + Math.floor(Math.random() * 300)}?random=${(Math.random() * 10).toFixed(0)}`;
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
