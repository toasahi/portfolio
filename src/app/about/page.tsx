import PhotoGallery from '@/components/photo-gallery';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className=" mb-16">
          <h1 className="text-xl font-medium text-gray-900 mb-2">
            About
            <span className="text-orange-500 ml-1">✨</span>
          </h1>
        </header>

        <main className="space-y-12 ">
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              プロフィール
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4 text-left">
              <p className="text-gray-700">
                SRE,Platform
                Engineerとして、信頼性の高いシステムの構築と運用、開発者の支援に取り組んでいます。
                分散システムの可観測性向上、IaC化、トイルの自動化を通じて、開発者が本来の業務に集中できる環境を提供しています。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              技術スタック
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  🔧 Infrastructure
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Kubernetes</li>
                  <li>Docker</li>
                  <li>Terraform</li>
                  <li>AWS</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  📊 Monitoring
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Prometheus</li>
                  <li>Grafana</li>
                  <li>OpenSearch</li>
                  <li>OpenTelemetry</li>
                  <li>Fluentd</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  ⚡ Programming
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Go</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">🚀 DevOps</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>GitHub Actions</li>
                  <li>ArgoCD</li>
                  <li>Helm</li>
                  <li>Istio</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              趣味・興味
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    📸 写真撮影
                  </h3>
                  <p className="text-sm text-gray-600">
                    風景写真、ストリートフォトグラフィーを中心に撮影しています。
                    普段の日常を収めるのが好きです。
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    🍜 ラーメン巡り
                  </h3>
                  <p className="text-sm text-gray-600">
                    様々なラーメン店を訪れ、その味や雰囲気を楽しんでいます。
                    特に、鶏白湯ラーメンと二郎系が大好きです。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <PhotoGallery />

          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-6">連絡先</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                お仕事のご依頼や技術的な相談がございましたら、お気軽にお声がけください。
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Twitter
                </a>
                <a
                  href="https://github.com/toasahi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://zenn.dev/asahigamieru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Zenn
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
