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
            :poster="$backend + form.video_thumbnail"
          >
            <source :src="$backend + form.video" type="video/mp4" />
          </video>
        </template>
      </el-form-item>
      <el-form-item label="宣传图">
        <el-button type="primary" icon="el-icon-upload" @click="uploadImagesShow = true">上传宣传图</el-button>
        <br />
        <el-image
          v-for="(image, i) in form.propaganda_images"
          :key="i"
          :src="$backend + image"
          style="width: 60px;"
          fit="fit"
        />
      </el-form-item>
      <el-form-item label="经纬度" required>
        <el-input v-model="form.location.longitude" placeholder="经度" />
        <el-input v-model="form.location.latitude" placeholder="纬度" />
      </el-form-item>
      <el-form-item label="地址" required>
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="活动描述" required>
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="报名时间">
        <el-date-picker
          v-model="form.start_signing_up_at"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="form.activityDuration"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </el-form-item>
      <el-form-item label="优惠券时效">
        <el-date-picker
          v-model="form.couponDuration"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </el-form-item>
      <el-form-item label="报名费">
        <el-input v-model="form.signing_up_fee" />
      </el-form-item>
      <el-form-item label="返利模式">
        <el-radio-group v-model="form.return_mode">
          <el-radio label="nothing">无</el-radio>
          <el-radio label="2level">二级</el-radio>
          <el-radio label="leader">团长</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
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
    <Upload
      v-show="uploadImagesShow"
      :key="Object.keys(form.propaganda_images).length"
      :url="$api + '/images/upload'"
      field="images"
      @close="close"
      @crop-upload-success="imagesUploadSuccess"
    />
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { createActivity } from '@/api/activities'

export default {
  components: { Upload },
  data() {
    return {
      form: {
        id: undefined,
        poster: undefined,
        video_thumbnail: undefined,
        video: undefined,
        propaganda_images: {},
        location: {
          longitude: undefined,
          latitude: undefined
        },
        start_signing_up_at: undefined,
        address: undefined,
        description: undefined,
        activityDuration: undefined,
        couponDuration: undefined,
        shop: undefined,
        title: undefined,
        tel: undefined,
        return_mode: 'nothing',
        signing_up_fee: undefined
      },
      imagecropperShow: false,
      uploadVideoShow: false,
      uploadThumbnailShow: false,
      uploadImagesShow: false
    }
  },
  methods: {

    onSubmit() {
      const tempForm = this.form
      if (this.form.activityDuration) {
        tempForm['start_at'] = this.form.activityDuration[0]
        tempForm['end_at'] = this.form.activityDuration[1]
      }
      if (this.form.couponDuration) {
        tempForm['allow_to_use_at'] = this.form.couponDuration[0]
        tempForm['expire_at'] = this.form.couponDuration[1]
      }

      createActivity(this.form).then((response) => {
        this.$message('成功')
      })
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
      this.form.video_thumbnail = resData
    },
    videoUploadSuccess(resData) {
      this.uploadVideoShow = false
      this.form.video = resData
    },
    imagesUploadSuccess(resData) {
      this.uploadImagesShow = false
      this.form.propaganda_images[Object.keys(this.form.propaganda_images).length] = resData
      console.log(this.form.propaganda_images)
    },
    close() {
      this.imagecropperShow = false
      this.uploadThumbnailShow = false
      this.uploadVideoShow = false
      this.uploadImagesShow = false
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
