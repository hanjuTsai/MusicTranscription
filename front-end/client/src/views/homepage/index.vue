<template>
  <div>
    <el-row>
      <div style="height:60px; backgroundColor:white;">
      </div>
      <div class="homepage_blockone_bgcolor">
        <div class="title1">
          Sound Separation And
        </div>
        <div class="title2">
          Sheet Transformation
        </div>
      </div>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="homepage_subtitle">convecience</div>
        <div class="homepage_subtitle">user-friendly</div>
        <button type="primary" class="homepage_button_1" @click="toConverter">Get Started</button>
      </el-col>
      <el-col :span="12">
        <div class="homepage_blocktwo_bgcolor"></div>
        <div style="z-index:0">
          <img src="../../picture/keyboard.png" class="keyboard" />
        </div>
      </el-col>
    </el-row>
    <hr />
    <el-row>
      <div style="font-size:50px; text-align:center; margin: 20px">
        Introduction
      </div>
      <div style="height:500px; backgroundColor:white; font-size:40px">
        <div>音樂是現代人生活不可分割的一部分，其中聽寫譜一直是音樂系的必修，</div>
        <hr style="margin:15px" />
        <div>在音樂領域中一直都是個技術門檻極高的技巧。因此，我們希望透過人工</div>
        <hr style="margin:15px" />
        <div>智慧的技術，將音樂轉換成可閱讀式的五線譜，藉此降低聽寫譜的門檻需</div>
        <hr style="margin:15px" />
        <div>求，讓一般人都可以輕鬆達成這件事。</div>
      </div>
    </el-row>
    <hr style="margin:25px" />
    <el-row>
      <div style="height:750px; backgroundColor:black;">
        <div
          style="font-size:50px; text-align:center; color:white; padding-top:20px"
        >
          Member
        </div>
        <el-row style="margin-top:20px">
          <el-col :span="8">
            <div>
              <img src="../../picture/1.jpg" style="width:175px; height:225px; backgroundColor:white; margin-left:30%">
            </div>
            <div style="font-size:30px; color:white;margin-left:40%;margin-top:20px">
              蔡涵如
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <img src="../../picture/2.jpg" style="width:175px; height:225px; backgroundColor:white; margin-left:30%">
            </div>
            <div
              style="font-size:30px; color:white;margin-left:42%;margin-top:20px"
            >
              鄭 揚
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <img src="../../picture/3.jpg" style="width:175px; height:225px; backgroundColor:white; margin-left:30%">
            </div>
            <div
              style="font-size:30px; color:white;margin-left:40%;margin-top:20px"
            >
              林建鋐
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span="8">
            <div>
              <img src="../../picture/4.jpg" style="width:175px; height:225px; backgroundColor:white; margin-left:30%">
            </div>
            <div
              style="font-size:30px; color:white;margin-left:36%;margin-top:20px"
            >
              皇甫立翔
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <img src="../../picture/5.jpg" style="width:175px; height:225px; backgroundColor:white; margin-left:30%">
            </div>
            <div
              style="font-size:30px; color:white;margin-left:40%;margin-top:20px"
            >
              顏价廷
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <img src="../../picture/6.jpg" style="width:175px; height:225px; backgroundColor:white; margin-left:30%">
            </div>
            <div
              style="font-size:30px; color:white;margin-left:40%;margin-top:20px"
            >
              劉韋成
            </div>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <hr style="margin:25px" />
    <el-row>
      <div style="font-size:50px; text-align:center;">Professor</div>
      <el-col :span="2">
        <div style="height:400px"></div>
      </el-col>
      <el-col :span="6">
        <div>
          <img src="../../picture/lu_small.jpg" style="width:275px; height:400px; backgroundColor:white; margin-left:10%">
        </div>
      </el-col>
      <el-col :span="16">
        <div style="font-size:50px; text-align:center; margin:20px">
          Hsin-Ming Lu
        </div>
        <el-col :span="4">
          <div style="height:290px"></div>
        </el-col>
        <el-col :span="16">
          <div style="font-size:30px">Associated Professor</div>
          <hr style="margin-top:25px; margin-bottom:25px;; margin-right:25px;" />
          <div style="font-size:30px">Department of Information Management</div>
          <hr style="margin-top:25px; margin-bottom:25px;; margin-right:25px;" />
          <div style="font-size:30px">National Taiwan University</div>
          <hr style="margin-top:25px; margin-bottom:25px;; margin-right:25px;" />
        </el-col>
        <el-col :span="4">
          <div style="height:290px"></div>
        </el-col>
      </el-col>
    </el-row>
    <hr style="margin:25px" />
    <el-row>
      <div style="height:450px; backgroundColor:black;">
        <div
          style="font-size:50px; text-align:center; color:white; padding-top:20px"
        >
          Source
        </div>
        <el-col :span="2">
          <div style="height:270px;backgroundColor:black;margin-top:20px"></div>
        </el-col>
        <el-col :span="20">
          <div style="height:270px;backgroundColor:black;margin-top:20px">
            <div style="color:white; font-size:30px; text-align:center">
              stacked hour glass: <a style="color:white; text-decoration:none" href="https://arxiv.org/pdf/1805.08559.pdf">https://arxiv.org/pdf/1805.08559.pdf</a>
            </div>
            <hr style="margin:15px" />
            <div style="color:white; font-size:30px; text-align:center">
              onset and frame: <a style="color:white; text-decoration:none" href="https://arxiv.org/pdf/1710.11153.pdf">https://arxiv.org/pdf/1710.11153.pdf</a>
            </div>
            <hr style="margin:15px" />
          </div>
        </el-col>
        <el-col :span="2">
          <div style="height:270px;backgroundColor:black;margin-top:20px"></div>
        </el-col>
      </div>
    </el-row>
    <!-- <el-row>
      <hr/>
      endj
    </el-row>
    <el-row>
      <hr/>
      adna
    </el-row>
    <el-row>
      <hr/>
      dhkja
    </el-row>
    <el-row>
      <hr/>
      esdnk
    </el-row> -->
  </div>
</template>
<script>
export default {
  name: 'Homepage',
  methods: {
    toConverter() {
      this.$router.push('/converter');
    }
  }
};
</script>
<style lang="stylus" scoped>
.homepage_blockone_bgcolor {
  background-color: rgb(0, 0, 0);
  height:240px

}
.homepage_blocktwo_bgcolor {
  background-color: rgb(0, 0, 0);
  height:110px
  margin-bottom : -40px
}
.title1 {
  color : white
  font-size : 50px
  padding-top : 3%
  padding-left : 3%
}
.title2 {
  color : white
  font-size : 50px
  padding-left : 3%
}
.homepage_button_1 {
  background-color: black
  color: white
  font-size : 40px
  width:250px
  height:75px
  margin-top : 30px
  margin-left : 28%
  margin-bottom : 60px
}
.homepage_subtitle {
  font-size : 35px
  margin-top : 15px
  width: 350px
  margin-left : 31%
}
.keyboard {
  width : 100%
  height: 130px
  margin-bottom : -150px
}
</style>
