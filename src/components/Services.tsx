import React, { useState } from 'react';
import { Briefcase, GraduationCap, Building, Globe, Users, MessageCircle, FileText } from 'lucide-react';

const content = {
  en: {
    title: 'Our Services',
    subtitle: 'Comprehensive visa consultation services tailored to your needs',
    services: {
      business: {
        title: 'Business Visa',
        description: 'Complete assistance with business visa applications for entrepreneurs and companies looking to expand to Japan',
        details: [
          'Starting a new business in Japan',
          'Expanding existing Sri Lankan business to Japan',
          'Complete documentation and legal guidance',
          'Business registration support',
          'Branch office establishment assistance'
        ]
      },
      student: {
        title: 'Student Visa',
        description: 'Support for students planning to study in Japan, from language schools to universities',
        details: [
          'Connect with schools matching your background and goals',
          'Language schools and university guidance',
          'Some schools require Japanese proficiency, others don\'t',
          'Even beginners in Japanese can apply',
          'Full visa application process guidance'
        ]
      },
      hsp: {
        title: 'EHS Visa Under HSP Category',
        description: 'Engineer (E), Specialist in Humanities (H), International Services (S), all related fields',
        details: [
          '🧠 Engineer (E): Software Engineer, System Engineer, Network Engineer, Mechanical/Electrical/Civil Engineers, Quality Control & R&D',
          '📚 Specialist in Humanities (H): Accountant, Finance Officer, HR Specialist, Marketing Executive, Business Analyst, Translator',
          '🌍 International Services (S): Translator/Interpreter, Language Instructor, Import-Export Specialist, Tourism Coordinator',
          '⏱️ Visa Duration: 1, 3, or 5 years (renewable)',
          '✅ No payment required until interview stage'
        ]
      },
      dependent: {
        title: 'Dependent Visa',
        description: 'Help family members join their loved ones in Japan',
        details: [
          'Spouse visa applications',
          'Child dependent visa support',
          'Family reunification guidance',
          'Complete documentation assistance',
          'Immigration process support'
        ]
      },
      consultation: {
        title: 'Visa Consultation',
        description: 'Expert advice on visa types, requirements, and application processes',
        details: [
          'Personalized visa type recommendations',
          'Eligibility assessment',
          'Requirements and documentation checklist',
          'Application timeline guidance',
          'Interview preparation support'
        ]
      },
      document: {
        title: 'Document Preparation',
        description: 'Professional assistance with preparing and translating required documents',
        details: [
          'Document verification and review',
          'Professional translation services',
          'Notarization assistance',
          'Document formatting per Japanese standards',
          'Complete application package preparation'
        ]
      }
    }
  },
  si: {
    title: 'අපගේ සේවා',
    subtitle: 'ඔබේ අවශ්‍යතා සඳහා විශේෂිත වීසා උපදේශන සේවා',
    services: {
      business: {
        title: 'ව්‍යාපාරික වීසාව',
        description: 'ව්‍යාපාරික වීසා ඉල්ලුම් සඳහා සම්පූර්ණ සහාය ව්‍යවසායකයින් සහ ජපානය ට පුළුල් වීමට අපේක්ෂා කරන සමාගම් සඳහා',
        details: [
          'ජපානයේ නව ව්‍යාපාරයක් ආරම්භ කිරීම',
          'පවතින ලංකාවේ ව්‍යාපාර ජපානයට පුළුල් කිරීම',
          'සම්පූර්ණ ලේඛන සහ නීතිමය මග පෙන්වීම',
          'ව්‍යාපාර ලියාපදිංචි සහාය',
          'ශාඛා කාර්යාල ස්ථාපිත කිරීමේ සහාය'
        ]
      },
      student: {
        title: 'ශිෂ්‍ය වීසාව',
        description: 'ජපානයේ අධ්‍යාපනය ලබයීමට සැලසුම් කරන සිසුන් සඳහා සහාය, භාෂා පාසල් සිට විශ්ව විද්‍යාල දක්වා',
        details: [
          'ඔබේ පසුබිම සහ ඉලක්කවලට ගැලපෙන පාසල් සමඟ සම්බන්ධ වීම',
          'භාෂා පාසල් සහ විශ්ව විද්‍යාල මාර්ගෝපදේශනය',
          'ඇතැම් පාසල් ජපන් භාෂා දක්ෂතාව අවශ්‍ය කරයි, අනෙක් අවශ්‍ය නොකරයි',
          'ජපන් භාෂාවේ ආරම්භකයන්ටත් ඉල්ලුම් කළ හැක',
          'සම්පූර්ණ වීසා ඉල්ලුම් ක්‍රියාවලිය මග පෙන්වීම'
        ]
      },
      hsp: {
        title: 'EHS කාණ්ඩය යටතේ HSP වීසාව',
        description: 'ඉංජිනේරු (E), මානව විද්‍යා විශේෂඥ (H), ජාත්‍යන්තර සේවා (S), සියලුම අදාළ ක්ෂේත්‍ර',
        details: [
          '🧠 ඉංජිනේරු (E): Software Engineer, System Engineer, Network Engineer, යාන්ත්‍රික/විදුලි/සිවිල් ඉංජිනේරු, ගුණාත්මක පාලනය සහ R&D',
          '📚 මානව විද්‍යා විශේෂඥ (H): ගණකාධිකාරි, මුල්‍ය නිලධාරි, HR විශේෂඥ, අලෙවි විධායක, ව්‍යාපාර විශ්ලේෂක, පරිවර්තක',
          '🌍 ජාත්‍යන්තර සේවා (S): පරිවර්තක/පරිවර්තිකා, භාෂා උපදේශක, ආනයන-අපනයන විශේෂඥ, සංචාර සම්බන්ධීකාරක',
          '⏱️ වීසා කාල සීමාව: වසර 1, 3, හෝ 5 (අලුත් කළ හැක)',
          '✅ සම්මුඛ පරීක්ෂණ අදියර දක්වා ගෙවීමක් අවශ්‍ය නැත'
        ]
      },
      dependent: {
        title: 'යාපෙන්නන්ගේ වීසාව',
        description: 'පවුලේ සාමාජිකයන්ට ජපානයේ ඔවුන්ගේ ආදරණීයයන් හා එක්වීමට උදව් කිරීම',
        details: [
          'කලත්‍රය වීසා ඉල්ලුම්',
          'දරුවන්ගේ යාපෙන්නන්ගේ වීසා සහාය',
          'පවුල නැවත එක්වීමේ මාර්ගෝපදේශනය',
          'සම්පූර්ණ ලේඛන සහාය',
          'ආගමන ක්‍රියාවලිය සහාය'
        ]
      },
      consultation: {
        title: 'වීසා උපදේශනය',
        description: 'වීසා වර්ග, අවශ්‍යතා සහ ඉල්ලුම් ක්‍රියාවලි පිළිබඳ විශේෂඥ උපදේස්',
        details: [
          'පුද්ගලාරෝපිත වීසා වර්ග නිර්දේශ',
          'සුදුසුකම් තක්සේරුව',
          'අවශ්‍යතා සහ ලේඛන පරීක්ෂණ ලැයිස්තුව',
          'ඉල්ලුම් කාල රාමුව මාර්ගෝපදේශනය',
          'සම්මුඛ පරීක්ෂණ සූදානම් සහාය'
        ]
      },
      document: {
        title: 'ලේඛන සකස් කිරීම',
        description: 'අවශ්‍ය ලේඛන සකස් කිරීම සහ පරිවර්තනය කිරීම සඳහා වෘත්තීය සහාය',
        details: [
          'ලේඛන සත්‍යාපනය සහ සමාලෝචනය',
          'වෘත්තීය පරිවර්තන සේවා',
          'නොතාරිස් කිරීමේ සහාය',
          'ජපන් ප්‍රමිති අනුව ලේඛන හැඩතල ගැන්වීම',
          'සම්පූර්ණ ඉල්ලුම් පැකේජය සකස් කිරීම'
        ]
      }
    }
  },
  ja: {
    title: '私たちのサービス',
    subtitle: 'お客様のニーズに合わせた包括的なビザ申請サポート',
    services: {
      business: {
        title: 'ビジネスビザ',
        description: '日本でビジネスを展開する起業家や企業のためのビジネスビザ申請の完全サポート',
        details: [
          '日本での新規事業の立ち上げ',
          'スリランカの既存事業の日本への拡大',
          '完全な書類作成と法的ガイダンス',
          '事業登録サポート',
          '支店設立支援'
        ]
      },
      student: {
        title: '留学ビザ',
        description: '語学学校から大学まで、日本留学を計画している学生のためのサポート',
        details: [
          'あなたの経歴と目標に合った学校とのマッチング',
          '語学学校と大学のガイダンス',
          '日本語能力が必要な学校もあれば、不要な学校もあります',
          '日本語初心者でも申請可能',
          'ビザ申請プロセスの完全ガイダンス'
        ]
      },
      hsp: {
        title: 'EHSカテゴリーの高度人材ビザ',
        description: '技術者(E)、人文科学専門家(H)、国際業務(S)、すべての関連分野',
        details: [
          '🧠 技術者(E): ソフトウェアエンジニア、システムエンジニア、ネットワークエンジニア、機械/電気/土木エンジニア、品質管理・R&D',
          '📚 人文科学専門家(H): 会計士、財務担当者、人事スペシャリスト、マーケティング担当者、ビジネスアナリスト、翻訳者',
          '🌍 国際業務(S): 翻訳・通訳、語学講師、輸出入スペシャリスト、観光コーディネーター',
          '⏱️ ビザ期間: 1年、3年、または5年(更新可能)',
          '✅ 面接段階まで支払い不要'
        ]
      },
      dependent: {
        title: '家族滞在ビザ',
        description: '日本にいる家族と一緒に暮らすための家族ビザサポート',
        details: [
          '配偶者ビザ申請',
          '子供の家族滞在ビザサポート',
          '家族再統合ガイダンス',
          '完全な書類作成支援',
          '入国管理プロセスサポート'
        ]
      },
      consultation: {
        title: 'ビザ相談',
        description: 'ビザの種類、要件、申請プロセスに関する専門的なアドバイス',
        details: [
          '個別のビザタイプ推奨',
          '資格評価',
          '要件と書類チェックリスト',
          '申請スケジュールガイダンス',
          '面接準備サポート'
        ]
      },
      document: {
        title: '書類準備',
        description: '必要書類の準備と翻訳のための専門的なサポート',
        details: [
          '書類の確認とレビュー',
          'プロフェッショナル翻訳サービス',
          '公証支援',
          '日本の基準に従った書類フォーマット',
          '完全な申請パッケージの準備'
        ]
      }
    }
  }
};

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'si' | 'ja' | null>(null);
  const [showLangSelector, setShowLangSelector] = useState(true);

  const toggleExpand = (id: string | null) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const selectLanguage = (lang: 'en' | 'si' | 'ja') => {
    setLanguage(lang);
    setShowLangSelector(false);
  };

  const changeLanguage = () => {
    setShowLangSelector(true);
    setExpandedId(null);
  };

  const currentContent = language ? content[language] : content.en;

  return (
    <section id="services" className="py-24 bg-white">
      {/* Language Selection Popup */}
      {showLangSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-black via-gray-900 to-red-900 p-10 rounded-2xl border-4 border-red-600 shadow-2xl max-w-md w-full mx-4">
            <div className="text-center mb-8">
              <Globe className="text-red-600 w-20 h-20 mx-auto mb-4 animate-pulse" />
              <h3 className="text-3xl font-bold text-white mb-2">
                Choose Your Language
              </h3>
              <p className="text-2xl font-bold text-white mb-2">
                ඔබේ භාෂාව තෝරන්න
              </p>
              <p className="text-2xl font-bold text-white mb-4">
                言語を選択してください
              </p>
              <div className="h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => selectLanguage('en')}
                className="w-full bg-white hover:bg-red-600 text-black hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-white flex items-center justify-center space-x-3"
              >
                <span className="text-3xl">🇬🇧</span>
                <span className="text-xl">English</span>
              </button>
              
              <button
                onClick={() => selectLanguage('si')}
                className="w-full bg-white hover:bg-red-600 text-black hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-white flex items-center justify-center space-x-3"
              >
                <span className="text-3xl">🇱🇰</span>
                <span className="text-xl">සිංහල</span>
              </button>
              
              <button
                onClick={() => selectLanguage('ja')}
                className="w-full bg-white hover:bg-red-600 text-black hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-white flex items-center justify-center space-x-3"
              >
                <span className="text-3xl">🇯🇵</span>
                <span className="text-xl">日本語</span>
              </button>
            </div>
            
            <p className="text-gray-300 text-center mt-6 text-sm">
              Select your preferred language to continue
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              {language === 'si' ? (
                <>අපගේ <span className="text-red-600">සේවා</span></>
              ) : language === 'ja' ? (
                <>私たちの<span className="text-red-600">サービス</span></>
              ) : (
                <>Our <span className="text-red-600">Services</span></>
              )}
            </h2>
            {language && (
              <button
                onClick={changeLanguage}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all duration-300 hover:scale-110"
                title={language === 'en' ? 'Change Language' : language === 'si' ? 'භාෂාව වෙනස් කරන්න' : '言語を変更'}
              >
                <Globe size={24} />
              </button>
            )}
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(currentContent.services).map(([key, service]) => {
            const icons: Record<string, any> = {
              business: Briefcase,
              student: GraduationCap,
              hsp: Building,
              dependent: Users,
              consultation: MessageCircle,
              document: FileText
            };
            const Icon = icons[key];

            return (
              <div
                key={key}
                className="group bg-black p-8 rounded-xl border-2 border-red-600 hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => toggleExpand(key)}
              >
                <div className="bg-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>

                {expandedId === key && (
                  <div className="mt-6 p-4 bg-red-700 rounded-md text-white transition-all duration-500 ease-in-out">
                    <ul className="space-y-2">
                      {service.details.map((detail: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-yellow-400 mr-2">✦</span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}