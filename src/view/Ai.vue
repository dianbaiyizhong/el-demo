<script setup lang="ts">
import {
  // 消息气泡
  Bubble,
  // 发送框
  Sender,
} from 'ant-design-x-vue';

defineOptions({ name: 'SampleChat' });

const messages = [
  {
    content: 'Hello, Ant Design X Vue!',
    role: 'user',
  },
];
</script>

<template>
  <Bubble.List :items="messages" />
  <Sender />
</template>