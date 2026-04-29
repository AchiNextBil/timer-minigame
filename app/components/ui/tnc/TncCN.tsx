import styles from './Tnc.module.css';

const TncCN = () => {
  return (
    <div className={styles.tncParent}>
      <ol>
        <li>
          此优惠面向所有中国 M88 会员。
          <table>
            <thead>
              <tr>
                <th>活动时间 (GMT+8)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026 年 06 月 12 日 00:00:00 – 2026 年 07 月 19 日 23:59:59</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li>
          活动期间，会员将根据具体游戏获得奖金。 奖金详情如下：
          <table>
            <thead>
              <tr>
                <th rowSpan={2}>2026 年世界杯热血小游戏</th>
                <th rowSpan={2}>奖金</th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              <tr>
                <td>游戏 1：世界杯知识大比拼</td>
                <td>18 元</td>
              </tr>
              <tr>
                <td>游戏 2：8.88 秒 挑战赢奖金</td>
                <td>8 元 - 36 元</td>
              </tr>
              <tr>
                <td>游戏 3：点球大战</td>
                <td>6 元 - 18 元</td>
              </tr>
            </tbody>
          </table>
          {/* <br />
          **奖品不可兑换为免费彩金。
          <br />
          **旅游奖项不可转让。
          <br />
          **第 2 至第 6 名将获得前往摩纳哥夏日假期的双人全额赞助行程。
          <br />
          **行程包含：
          <br />
          - 从获奖者所在国家出发的 往返商务舱机票 2 张
          <br />
          - 6 天 5 夜五星级酒店住宿
          <br />
          - 机场与酒店之间的接送服务（往返）
          <br />
          <br />
          获奖者需自行办理前往摩纳哥的签证，M88 不承担任何签证办理费用与相关责任。
          <br />
          排名将于每周 星期二下午 2 点（GMT+8） 更新
          <br />
          点击此处查看您的当前排名。 */}
        </li>
        {/* 4 */}
        <li>为了确保游戏公平公正，每位会员每天仅可参与每个游戏一次。</li>
        {/* 5 */}
        <li>
          此优惠当日需要存款至少 100 元并参与游戏，经过审核后将派发奖金给首 888
          名符合条件的会员，先到先得，派完为止。
        </li>
        {/* 6 */}
        <li>
          奖金将在<strong>每日</strong>审核后 <strong>3 天内</strong>派发。
        </li>
        {/* 7 */}
        <li>
          仅计算“<strong>真钱投注</strong>
          ”和已结算的合格投注。所有平局/退款/拒绝/无效/取消的投注/实时兑现，以及赔率低于 1.50
          的投注（马来赔率 0.50；香港赔率 0.50；印度赔率
          -2.00）将不包括在有效合格投注和/或流水要求的计算中（如适用）。
        </li>
        {/* 8 */}
        <li>
          奖金需 <strong>5 倍流水</strong>投注于 <strong>所有体育 & 电竞</strong>即可申请提款。
        </li>
        {/* 9 */}
        <li>
          奖金将会在优惠活动结束后 5 天内自动派发到您的钱包。 未使用奖金将在成功派发的 5
          天后自动过期。
        </li>
        {/* 10 */}
        <li>会员必须在 7 天内完成有效投注额要求，否则系统将自动清除赢利和红利奖金。</li>
        {/* 11 */}
        <li>
          如在提交答案遇到任何问题 <strong>（仅限游戏 1）</strong>
          ，可以随时寻找在线客服，或邮件至 <strong>m88promo@m88asia.com。</strong>
        </li>
        <li> 活动的答案不接受邮件提交，请通过活动页面完成。</li>
        {/* 12 */}
        <li>
          <a
            target="_blank"
            href="https://www.m88.com/~/static/standalone-pages/promotions/terms-conditions.zh-CN"
          >
            一般条款及规则应用于此优惠。
          </a>
        </li>
      </ol>
    </div>
  );
};

export default TncCN;
