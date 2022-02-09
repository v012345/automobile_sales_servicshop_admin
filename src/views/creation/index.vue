<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="门店" required>
        <el-input v-model="form.shop" />
      </el-form-item>
      <el-form-item label="活动名称" required>
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="主办方电话" required>
        <el-input v-model="form.tel" />
      </el-form-item>
      <el-form-item label="海报">
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow = true">上传海报</el-button>
        <br />
        <template v-if="form.poster">
          <el-image style="height: 120px" :src="$backend + form.poster" fit="fit" />
        </template>
      </el-form-item>
      <el-form-item label="视频">
        <el-button type="primary" icon="el-icon-upload" @click="uploadVideoShow = true">上传视频</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="uploadThumbnailShow = true">上传封面</el-button>
        <br />
        <template v-if="form.video">
          <video
            preload="auto"
            width="380px"
            controls="controls"
            x5-video-player-fullscreen="false"
            x5-playsinline
            playsinline
            webkit-playsinline="true"
            :poster="$backend + form.thumbnail"
          >
            <source :src="$backend + form.video" type="video/mp4" />
          </video>
        </template>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <Upload
      v-show="imagecropperShow"
      :url="$api + '/poster/upload'"
      field="poster"
      @close="close"
      @crop-upload-success="posterUploadSuccess"
    />
    <Upload
      v-show="uploadThumbnailShow"
      :url="$api + '/thumbnail/upload'"
      field="thumbnail"
      @close="close"
      @crop-upload-success="thumbnailUploadSuccess"
    />
    <Upload
      v-show="uploadVideoShow"
      :url="$api + '/video/upload'"
      field="video"
      img-format="mp4"
      @close="close"
      @crop-upload-success="videoUploadSuccess"
    />
  </div>
</template>

<script>
import Upload from '@/components/Upload'

export default {
  components: { Upload },
  data() {
    return {
      form: {
        poster: undefined,
        thumbnail: undefined,
        video: undefined,
        images: {},
        shop: '',
        title: '',
        tel: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      uploadVideoShow: false,
      thumbnail: false,
      uploadThumbnailShow: false
    }
  },
  methods: {

    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    posterUploadSuccess(resData) {
      this.imagecropperShow = false
      this.form.poster = resData
    },
    thumbnailUploadSuccess(resData) {
      this.uploadThumbnailShow = false
      this.form.thumbnail = resData
    },
    videoUploadSuccess(resData) {
      this.uploadVideoShow = false
      this.form.video = resData
    },
    close() {
      this.imagecropperShow = false
      this.uploadThumbnailShow = false
      this.uploadVideoShow = false
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

