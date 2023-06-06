import React from 'react';
import CommonLayout from '../commonLayout/CommonLayout';
import Styles from '../HubTopUI/HubTopUI.module.css';
import Link from 'next/link';

const TermsService = () => {
  return (
    <>
      <CommonLayout>
        {/* BreadCrumb   */}
        <div className={Styles.section_breadcrumb}>
          <ul>
            <li>
              <Link href="#">利用規約</Link>
            </li>
          </ul>
        </div>

        <section className={Styles.terms_section}>
          <div className={Styles.terms_title}>
            <h2>利用規約</h2>
          </div>
          <div>
            <div className={Styles.terms_container}>
              <div>
                <p>
                  {' '}
                  Ecomedia.io、および、is.community 利用規約 <br />
                  Ecomedia.io、および、is.community利用規約」（以下「本規約」といいます）は、Scalably株式会社（以下「当社」といいます）が提供する多言語コミュニティプラットフォームサービス「Ecomedia.io、および、is.community」ならびにこれに関連するサービス（以下「本サービス」といいます）の利用条件を定めるものです。
                  <br />
                  本サービスは、当社がインターネット上で収集する（または提供を受ける）企業・団体・コミュニティ等のニュースやプレスリリースをトピックとして意見交換や情報交換するコミュニティグループに参加することができるサービスです。
                  <br />
                  本規約において、「ユーザー」とは、本サービスの利用者をいい、本サービスの会員登録をした時点から、本規約および個人情報保護方針に同意したものとみなします。
                  <br />
                  第1条（適用の範囲）
                  <br />
                  1. 本規約は、当社が運営する本サービスおよびこれに付帯するサービスの利用に関する一切について適用されるものとします。
                  <br />
                  2.
                  特定の会員に対してのみ適用されるサービス等については、本規約に加えて、当社が本サービスを提供するウェブサイト（以下「本サイト」といいます）上で定める当該個別のサービスの内容や利用条件等（以下「個別サービス利用条件」といいます）も適用されるものとし、これらの個別サービス利用条件も本規約の一部を構成するものとします。個別サービス利用条件と本規約が矛盾または抵触する場合、個別サービス利用条件が優先するものとします。
                  <br />
                  第2条（必要環境）
                  <br />
                  本サイトの利用または本サービスを通じた第三者のサービス・コンテンツ・リソースの利用には、インターネットへの接続が必要になります。いずれも通信料金はユーザーの負担となります。
                  <br />
                  第3条（本サービスの利用）
                  <br />
                  1.
                  本サービスは、本規約のほか、日本の法令等およびユーザーに適用される法令等を遵守している者に限り、利用することができるものとします。日本の法令またはユーザーに適用される法令上未成年の方は、保護者（法定代理人）から本サービスを利用する許可を得ていることを表明し、保証したものとみなします。
                  <br />
                  2.
                  ユーザーは会員登録のために必要な情報（以下「ユーザーアカウント情報」といいます）を入力してアカウントを作成し、会員登録する事で、本サービスを会員として無料で利用することができるようになります。当該会員登録が完了した時点で、当社と当該ユーザーとの間に本規約に基づき本サービスを利用するための契約（以下「本契約」といいます）が成立します。本サービスは会員の種類によって閲覧可能なコンテンツ等、利用可能な機能が異なり、その詳細は個別サービス利用条件に定められます。
                  <br />
                  3.
                  本サービスは個人で利用するものとし、法人・団体での利用やアカウント作成については別途、当社への申込みと承諾を必要とします。
                  <br />
                  4.
                  当社は、ユーザーが以下の各号のいずれかに該当すると判断した場合、事前の通知・催告等を経ることなく、会員登録の拒否、アカウントの停止もしくは本サービスへのアクセスの一時的な停止、または、本契約を解除して、アカウントの削除、本サービスへのアクセスの恒久的な停止もしくはユーザーコンテンツ（定義は後述）の削除をすることができるものとします。
                  <br />
                  1. 本規約に違反した場合。
                  <br />
                  2.死亡した場合または後見開始、保佐開始もしくは補助開始の審判を受けた場合。
                  <br />
                  3.過去に本項柱書に規定した措置を受けたことがある場合。
                  <br />
                  4.前科または前歴がある場合。
                  <br />
                  5.暴力団、暴力団員、暴力団準構成員、総会屋、社会運動等標榜ゴロ、特殊知能暴力集団その他これに準じる反社会的勢力（以下総称して「反社会的勢力等」といいます）であると判明した場合、または資金提供その他の行為を通じて反社会的勢力等の維持、運営もしくは経営に協力もしくは関与する等反社会的勢力等との何らかの交流もしくは関与をしている場合。
                  <br />
                  6.会員登録したにもかかわらず本サービスを3か月以上利用していない場合。
                  <br />
                  7.上記各号の他、当社が本項柱書に規定した措置が適切であると判断した場合。
                  <br />
                  5. ユーザーは本サービスに会員登録するにあたり、以下の点を遵守するものとします。
                  <br />
                  1.虚偽の個人情報を提供したり、当社の許可を得ることなく他人のアカウントを作成したりすることはできません。
                  <br />
                  2.個人用アカウントを複数作成することはできません。
                  <br />
                  3.アカウントが当社によって停止または削除された場合、当社の許可なく新たなアカウントを作成することはできません。
                  <br />
                  4.アカウントの連絡先情報を、当社からのメールを必ず受け取ることができる状態に保つものとします。
                  <br />
                  5.パスワードを共有したり、他人にアカウントへのアクセスを許可したり、その他、アカウントのセキュリティを脅かす恐れのある行為を行わないものとします。
                  <br />
                  6.アカウントを他人に譲渡することはできません。
                  <br />
                  7.アカウントのパスワードなどは、自己の責任において大切に保管し、機密を保持するものとします。ユーザーのアカウントが権限のない者により利用された形跡に気づいた場合、ただちに当社に通知するものとします。
                  <br />
                  6.当社は、会員のアカウントが当該会員以外の第三者によって利用された場合でも、当該会員による利用とみなすことができるものとします。
                  <br />
                  7.当社は、本サイト上に広告を掲載することや本サービスによりユーザーに提供する情報に広告を含めることができます。
                  <br />
                  第4条（本サイトおよび本サービスの変更・停止・終了）
                  <br />
                  当社は、ユーザーへ事前に通知することなく、本サイトもしくは本サービスを変更（機能の追加、制限、削除等を含みます）、停止（メンテナンスのための一時停止を含みます）、終了すること、またはそれらに含まれるコンテンツ等を削除することができ、それらに伴い必要な場合は本契約を解除することもできます。
                  <br />
                  第5条（ユーザーによる投稿等およびユーザーコンテンツの利用）
                  <br />
                  1.本サービスは、ユーザー自身がニュースやプレスリリース等に対してコメント等を投稿および表示し、本サービスの他ユーザーまたは第三者が提供するソーシャルネットワーキングサービスへシェアする機会を提供しています。ユーザー自身が投稿、表示、シェアするすべてのコメントまたはそれらに関連するものはすべて、本規約においては「ユーザーコンテンツ」といい、以下の条件に従うものとします。
                  <br />
                  2.ユーザーコンテンツには多数の個人や組織が発信する情報、見解、意見、および提言が含まれています。当社は、ユーザーコンテンツを閲覧し第6条第3項に基づき取り扱うことができますが、特定のユーザーの提言や意見についてそれを支持することはなく、また、ユーザーコンテンツの定期的な審査、編集は行いません。ユーザーは、ユーザーコンテンツを自らの判断と責任で閲覧、利用する事に同意します。
                  <br />
                  3.ユーザーは、自身が本サービスに投稿したユーザーコンテンツにつき、第三者の権利を侵害せず、また日本の法令等およびユーザーに適用される法令等にも違反しないようにすることを保証します。これらの権利または法令等には、知的財産権、名誉権、プライバシー権等を含みますが、これらに限定されません。
                  <br />
                  4.ユーザーは、他のユーザーが投稿したコメントその他のユーザーコンテンツが本規約に違反している、自らの権利を侵害しているその他の理由で当該ユーザーコンテンツの削除を求めたい場合、当該ユーザーコンテンツの投稿者または本サービス上当該ユーザーコンテンツの削除権限を有している他のユーザーに対して削除を求めるものとし、当社に対して削除を求めないものとします。
                  <br />
                  5.前項にかかわらず、当社は、コメントその他のユーザーコンテンツが本規約に違反していると判断した場合、行政機関、裁判所その他の第三者から削除の要請を受けた場合、適用される法令上当社が削除義務を負う場合その他当社が必要と判断する場合には、当社の判断により、事前通告なくユーザーコンテンツを削除することができます。この場合でも、ユーザーコンテンツを削除すべきか否かの判断は当社の裁量事項であり、当社がユーザーに対して削除義務や削除を拒否する義務を負うものではなく、ユーザーは当該判断について異議を申し立てたり当社の責任を追及したりすることはできません。また、当社は、ユーザーコンテンツを削除する場合を含め、ユーザーコンテンツのバックアップを取得する義務を負いません。
                  <br />
                  第6条（著作権等）
                  <br />
                  1.本サービスおよび本サイト（それらのソースコードを含みます）ならびにそれらに掲載されるユーザーコンテンツ以外のすべてのコンテンツ（以下総称して「本サービス構成物」といいます）に関わる著作権、商標権その他の一切の知的財産権およびその他の財産権はすべて、当社または当社がライセンスを受けているライセンサー等の第三者に帰属します。
                  <br />
                  2.ユ－ザーコンテンツに関わる著作権、商標権その他の一切の知的財産権およびその他の財産権は、すべてユーザーコンテンツを投稿したユーザーまたは当該ユーザーコンテンツに係る権利がユーザー以外の第三者に帰属する場合には当該権利者に帰属します。
                  <br />
                  3.ユーザーは、本契約を締結することで、当社および当社から権利を承継しまたは許諾された者に対して、前項が定めるユーザーコンテンツに関する全ての権利について、期間、地域および目的の限定なく、ユーザーコンテンツを使用、複製、公衆送信、頒布、翻訳・翻案その他日本のおよびユーザーに適用される著作権法が定める全ての態様で利用するための、無償、取消不能、譲渡可能かつ再利用許諾権付(再利用許諾の範囲は当社が許諾を得た権利の範囲内で自由とする)の利用許諾権を付与します。また、ユーザーは、ユーザーコンテンツに係る権利が第三者に帰属する場合は、当社が本項に基づく権利の付与を受けられるよう権利者から権利の譲渡または許諾を受け、当社および当社から権利を承継しまたは許諾された者に対して著作者人格権を行使せずかつ第三者の権利者をして行使させないことで、当社または当社の承継先・許諾先が権利侵害の責任を負うことを防ぐものとします。
                  <br />
                  第7条（禁止事項）
                  <br />
                  ユーザーは、本サービスの利用にあたり、以下の行為またはその準備行為を自らまたは第三者を通じて行わないものとします。
                  <br />
                  1.本サービス構成物またはユーザー本人が権利を有しないユーザーコンテンツを、権利者の明示的な書面承諾を得ないで、複製、転載、出版、公表、譲渡、公衆送信、翻訳、改変その他の態様で利用する行為またはフレームもしくはフレーム技術を使用しエンクローズする行為。
                  <br />
                  2.当社の明示的な書面承諾なくして、本サービスに関連してユーザーに提供される資料その他のデータの全部もしくは一部、当社もしくは本サービスの名前、本サイトのドメイン名、いかなる当社の商標・ロゴまたは本サービス構成物に含まれるフォーム、レイアウト、デザイン等について、複製、転載、出版、公表、譲渡、公衆送信、翻訳、改変その他の態様で利用する行為またはフレームもしくはフレーム技術を使用しエンクローズする行為。
                  <br />
                  3.本サービス構成物のソースコードの解析・改変・派生物の作成、デコンパイル、その他リバースエンジニアリングのための行為。
                  <br />
                  4.その他当社または正当な権利を有する権利者の著作権、商標権等の知的財産権を侵害する行為、または侵害する恐れのある行為。
                  <br />
                  5.自動化された手段（情報収集ボット、ロボット、スパイダー、スクレーパーなど）を使用して、本サービスにアカウント登録したり、アクセスしたりする行為。
                  <br />
                  6.他のユーザーに自らのアカウントで本サービスにログインさせる行為、他のユーザーのアカウントで本サービスにログインする行為、第三者になりすます行為またはそのための情報を入手するもしくは入手を試みる行為。
                  <br />
                  7.ウェブアプリケーションを含むソフトウェア等に不正な動作をさせることを意図したコンピューターウイルス、マルウェア等のプログラムやデータを送信する行為。
                  <br />
                  8.本サイトその他の当社が保有もしくは運用する通信設備、コンピューター、その他の機器もしくはソフトウェアに不正にアクセスする行為、それらの利用もしくは運用に支障を与えるもしくは与える恐れのある行為、またはこれらの行為を実施するための情報を収集する行為。
                  <br />
                  9.その他本サービスまたは本サイトにおける情報セキュリティに悪影響を与えるまたはその恐れがある行為。
                  <br />
                  10.本サービスを利用してピラミッド商法その他非合法なマルチ商法などを実施するまたはその勧誘をする行為。
                  <br />
                  11.本サービスを利用して特定の宗教団体、政治団体、反社会的勢力やそれらに関する活動への勧誘をする行為。
                  <br />
                  12.本サービスを利用して製品・サービスを販売するもしくはその勧誘をする行為または他のユーザーのアクセスによって自らが金銭的利益を得ることができる他のウェブサイト等に他のユーザーを誘導もしくは勧誘する行為。
                  <br />
                  13.本サービスを他のサービスの一部として第三者に提供するまたはその勧誘をする行為。
                  <br />
                  14.その他自らが金銭的利益を得る目的でユーザーコンテンツを投稿する、他のユーザーにメッセージを送信するその他本サービスを利用する行為。
                  <br />
                  15.第三者に対するいじめ、侮辱・誹謗中傷、脅迫、嫌がらせ、なりすましに当たる行為。
                  <br />
                  16.差別的、脅迫的もしくは暴力を誘発するような内容、ヌードその他のわいせつな内容、暴力・残虐な内容の描写、虚偽の事実または第三者のプライバシーや個人を特定可能な情報（第三者の写真等）が含まれるユーザーコンテンツを投稿すること。
                  <br />
                  17.違法な賭博・ギャンブル、自殺、薬物、未成年の家出、未成年による飲酒、異性もしくは同性と本サービス外で交流すること、成人向けサービスの利用等を勧誘・推奨する内容を含むユーザーコンテンツ（宣伝・公告を含む）を投稿すること。
                  <br />
                  18.類似した内容のユーザーコンテンツを何度も投稿すること、その場に掲載が想定されたコンテンツと関連性がない内容や意味を持たないユーザーコンテンツを投稿すること、その他本サービスの快適な利用を妨げることを目的とした行為。
                  <br />
                  19.その他日本の法令およびユーザーに適用される法令上違法な行為、日本およびユーザーが所在する国の公序良俗上悪質な行為、またはそのような行為に該当するとの誤解を招く行為。
                  <br />
                  20.上記各号のほか、本規約の違反を助長または推奨する行為、本サービスの運営を妨害する行為、当社の信用を毀損し、もしくは当社の財産を侵害する行為、当社に不利益を与える行為、その他当社が本サービスの利用目的から鑑みて不適切と判断する行為。
                  <br />
                  第8条（個人情報の保護）
                  <br />
                  1.当社は、ユーザーアカウント情報その他の当社が提供を受ける個人情報については、当社の定める個人情報保護方針に基づき取り扱います。
                  <br />
                  2.当社は、個人情報に該当しない本サービスを通じて収集した情報については、(ユーザーが知的財産権等を有するユーザーコンテンツについては第6条第3項の許諾の範囲内で)自らの裁量で自由に使用または開示することができ、本契約の期間中および本契約が終了した後においても、自らの裁量で保存、変更または削除することができます。
                  <br />
                  第9条（責任範囲および損害賠償）
                  <br />
                  1.本サービスは、１人でも多くの世界中のユーザーに活用していただくため、本サイト上に掲載するコンテンツ（ユーザーコンテンツを含む）を機械翻訳により多言語化しています。翻訳処理においては適切な翻訳結果が得られるよう最善・細心の注意が払われていますが、機械翻訳の内容は完全ではなく不正確な情報を含む場合があります。情報の正当性や事実性については、ユーザー自身が各コンテンツのソース（情報の発信元とその内容）を確認するものとし、翻訳によって生じた情報の矛盾や不一致、さらにこれによって生じた不利益等について当社は一切の責任を負いません。
                  <br />
                  2.その他、当社は、本サービス構成物、ユーザーアカウント情報、ユーザーコンテンツその他本サービスの提供する機能または情報の完全性、機密性、可用性、真実性、正確性（前項に定める翻訳の正確性を含みます）、合法性および第三者の知的財産権の非侵害について一切保証しません。また、当社は、以下の事項に関して解決または対応する義務を負うものではなく、以下の事項または上記の非保証事項に起因または関連してユーザーに損害、損失または費用等が発生した場合、一切の責任を負いません。
                  <br />
                  1.ユーザーもしくは他のユーザーによる本規約違反または本サービスの本来の利用目的・利用方法に従わない行為
                  <br />
                  2.ユーザーとその他のユーザーとの間のトラブル、紛争等
                  <br />
                  3.悪意のある攻撃者その他の第三者の行為（第三者の行為に起因または関連した本サービスの提供停止・中止またはユーザーアカウント情報その他の情報の漏洩、毀損もしくは不正利用、第三者によるユーザーへのなりすまし等を含むがこれらに限られない）
                  <br />
                  4.ユーザーが準備する本サービスの利用環境、ユーザーが利用するソーシャルネットワーキングサービス、本サービスにおいて翻訳機能を提供する第三者のサービス等の当社以外の第三者が提供する製品、サービスまたは情報の内容および提供の停止・中止
                  <br />
                  5.第3条第4項または第4条に基づく本サービスの内容変更、提供の停止・中止または本契約の解除
                  <br />
                  6.火災、地震、津波、洪水、台風その他の天災、疫病、疫病に伴う感染対策、回線の輻輳、回線の障害、サーバーダウンその他の本サービスを提供するための設備の障害、法令の制定・改正、政府機関による処分、ストライキ、ロックダウン、暴動、動乱、戦争、テロリズムまたはその他の当社の合理的支配を超えた事象
                  <br />
                  7.その他本規約において当社が義務または責任を負わないと定められた事項
                  <br />
                  3.当社は、当社が本契約上負う義務に違反した場合でも、故意又は重過失が認められない限り、ユーザーに対して、債務不履行責任、不法行為責任その他何らの責任も負いません。ただし、本契約に日本の消費者契約法が適用される場合または適用される法令上当該免責が無効とされる場合でかつ当社の過失による本契約上の義務違反が認められる場合、当該免責は適用されません。この場合、当社は、当社の義務違反から直接にかつ現実に財産的損害(逸失利益、間接的損害、精神的損害等は含まれません）が発生したことが証明された場合に限り当該損害額の限度で責任を負うものとします。
                  <br />
                  4.ユーザーは、自らの本規約違反に起因又は関連した事項により（本規約違反を原因とする他のユーザーとの紛争等や情報漏洩事故等を含むがこれらに限られません）当社に損害、損失、費用等（弁護士費用を含む）が発生した場合、その一切を当社に補償するとともに、自らの責任および費用負担で当該事項を解決し当社を防御するものとします。
                  <br />
                  第10条（ユーザーからの退会手続）
                  <br />
                  ユーザーが退会を希望する場合は、当社所定の退会手続きを行うものとします。当該退会手続きの完了により本契約は終了するものとします。
                  <br />
                  第11条（本規約の変更）
                  <br />
                  1.当社は、以下の場合には、一定の猶予期間を設けて変更後の本規約の効力発生日を定め、かつ、本規約を変更する旨および変更後の本規約の内容ならびにその効力発生日を事前に本サイト上への掲載、会員へのメールによる通知その他当社が適当と判断する方法で周知する方法により本規約の変更を行うことができるものとします。ユーザーは、当該変更に同意しない場合は第10条に基づき本契約を解除することができますが、解除せず当該猶予期間が経過した場合、変更後の利用規約に同意したものとみなされます。
                  <br />
                  1)利用規約の変更が、ユーザーの一般の利益に適合するとき。
                  <br />
                  2)利用規約の変更が、本契約をした目的に反せず、かつ、変更の必要性、変更後の内容の相当性、変更の内容その他の変更に係る事情に照らして合理的なものであるとき。
                  <br />
                  第12条（残存効）
                  <br />
                  本契約が終了した場合であっても、その原因を問わず、第5条から第9条および第11条から第17条については有効に存続するものとします。
                  <br />
                  第13条（権利等の譲渡）
                  <br />
                  当社は、本契約上の地位または当該契約に基づく権利もしくは義務を、第三者に譲渡または承継させることができます。ユーザーは、当社の事前の書面承諾がない限り、本契約上の地位または当該契約に基づく権利もしくは義務を、第三者に譲渡または承継させることができません。
                  <br />
                  第14条（可分性）
                  <br />
                  本規約の条項の一部が日本または適用されるユーザーの所在国の法令上無効とされた場合でも、その効果は当該無効とされた部分に限られ、残余部分は有効に適用されるものとします。
                  <br />
                  第15条（完全合意）
                  <br />
                  本規約は、当社とユーザーとの間の本契約または本サービスに関する最終的かつ完全な合意事項を定めたものであり、本規約に定められた事項は、本規約外または本契約締結以前に当社とユーザーとの間でなされた口頭または書面の連絡、回答、合意事項等に優先するものとします。
                  <br />
                  第16条（準拠法）
                  <br />
                  本規約は、日本法に準拠し、日本法に基づき解釈されます。
                  <br />
                  第17条（専属的合意管轄裁判所）
                  <br />
                  本規約に関する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                  <br />
                  附則
                  <br />
                  20XX年X月X日制定
                </p>
              </div>
            </div>
          </div>
        </section>
      </CommonLayout>
    </>
  );
};

export default TermsService;