import { EMOJI_NAME, EMOJI_MAP } from 'dnhyxc-ui-vue-plus';

const ERROR_IMG =
  'https://files.codelife.cc/wallhaven/full/4g/wallhaven-4gj2q4.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp';

// export const EMOJI_NAME = [
//   '[龇牙]',
//   '[调皮]',
//   '[流汗]',
//   '[偷笑]',
//   '[再见]',
//   '[敲打]',
//   '[擦汗]',
//   '[流泪]',
//   '[大哭]',
//   '[嘘]',
//   '[酷]',
//   '[抓狂]',
//   '[委屈]',
//   '[可爱]',
//   '[色]',
//   '[害羞]',
//   '[得意]',
//   '[吐]',
//   '[微笑]',
//   '[怒]',
//   '[尴尬]',
//   '[惊恐]',
//   '[冷汗]',
//   '[白眼]',
//   '[傲慢]',
//   '[难过]',
//   '[惊讶]',
//   '[疑问]',
//   '[困]',
//   '[么么哒]',
//   '[憨笑]',
//   '[衰]',
//   '[撇嘴]',
//   '[阴险]',
//   '[奋斗]',
//   '[发呆]',
//   '[右哼哼]',
//   '[抱抱]',
//   '[坏笑]',
//   '[鄙视]',
//   '[晕]',
//   '[大兵]',
//   '[可怜]',
//   '[饥饿]',
//   '[咒骂]',
//   '[折磨]',
//   '[抠鼻]',
//   '[鼓掌]',
//   '[糗大了]',
//   '[左哼哼]',
//   '[打哈欠]',
//   '[快哭了]',
//   '[吓]',
//   '[闭嘴]',
//   '[强]',
//   '[弱]',
//   '[握手]',
//   '[胜利]',
//   '[抱拳]',
//   '[勾引]',
//   '[差劲]',
//   '[拳头]',
//   '[OK]',
//   '[NO]',
//   '[爱你]',
//   '[爱心]',
//   '[心碎了]',
//   '[示爱]',
//   '[玫瑰]',
//   '[凋谢]',
//   '[挥手]',
//   '[发抖]',
//   '[飞吻]',
//   '[爱情]',
//   '[跳跳]',
//   '[怄火]',
//   '[转圈]',
//   '[磕头]',
//   '[回头]',
//   '[跳绳]',
//   '[激动]',
//   '[街舞]',
//   '[献吻]',
//   '[左太极]',
//   '[右太极]',
//   '[便便]',
//   '[炸弹]',
//   '[菜刀]',
//   '[刀]',
//   '[米饭]',
//   '[蛋糕]',
//   '[西瓜]',
//   '[啤酒]',
//   '[咖啡]',
//   '[太阳]',
//   '[月亮]',
//   '[多云]',
//   '[闪电]',
//   '[下雨]',
//   '[雨伞]',
//   '[礼物]',
//   '[篮球]',
//   '[皮球]',
//   '[乒乓]',
//   '[红双喜]',
//   '[鞭炮]',
//   '[红灯笼]',
//   '[麻将]',
//   '[麦克风]',
//   '[礼品袋]',
//   '[信封]',
//   '[象棋]',
//   '[彩带]',
//   // '[蜡烛]',
//   '[爆筋]',
//   '[棒棒糖]',
//   '[奶瓶]',
//   '[面条]',
//   '[香蕉]',
//   '[飞机]',
//   '[左车头]',
//   '[车厢]',
//   '[右车头]',
//   '[钞票]',
//   '[灯泡]',
//   '[风车]',
//   '[闹钟]',
//   '[彩球]',
//   '[钻戒]',
//   '[沙发]',
//   '[手枪]',
//   '[纸巾]',
//   // '[骷髅]',
//   '[猪头]',
//   '[瓢虫]',
//   '[猫咪]',
//   '[熊猫]',
//   '[青蛙]'
// ];

// 处理输入的换行符
export const replaceCommentContent = (content = '') => {
  const context = content.replace(/\n/g, '<br/>');
  return replaceEmojis(context);
};

// 表情包转换
export const replaceEmojis = (content = '') => {
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
export const replacePictures = (content = '') => {
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

export const wordToLink = (content: string) => {
  if (checkHref(content)) {
    return `<a style="color: #2b7de7; cursor: pointer; word-break: break-all; text-decoration: none;" href="${content}" target="_blank" rel="noopener noreferrer">${content}</a>`;
  }
  return content;
};

// 校验是否是有效的链接
export const checkHref = (url: string) => {
  const Expression =
    /^(https?:\/\/)?(([0-9a-z.]+\.[a-z]+)|(([0-9]{1,3}\.){3}[0-9]{1,3}))(:[0-9]+)?(\/[0-9a-z%/.\-_]*)?(\?[0-9a-z=&%_-]*)?(#[0-9a-z=&%_-]*)?/gi;
  const objExp = new RegExp(Expression);
  return objExp.test(url);
};
