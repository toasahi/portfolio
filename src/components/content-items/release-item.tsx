import type { ContentItem } from '@/types/content';

interface ReleaseItemProps {
  item: ContentItem;
}

export default function ReleaseItem({ item }: ReleaseItemProps) {
  return (
    <div className="w-full">
      {/* Release Header */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xl">{item.icon}</span>
        <span className="text-sm text-gray-600">Released</span>
        <span className="text-sm text-gray-500 font-medium">{item.title}</span>
        <span className="text-sm text-gray-400">{item.date}</span>
      </div>

      {/* Release Content */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {item.author?.name?.charAt(0)}
              </span>
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">
                  {item.author?.name}
                </span>
                <span className="text-gray-500 text-sm">
                  {item.author?.handle}
                </span>
              </div>
              <span className="text-blue-500 text-sm">🐦</span>
            </div>
            <p className="text-gray-900 text-sm leading-relaxed mb-3">
              {item.description}
            </p>

            {/* Preview */}
            {item.preview && (
              <div className="mb-3">
                {/* Zenn風: 大きなロゴと3列の機能説明 */}
                {item.preview.type === 'features' && item.preview.features && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {/* サービスロゴエリア */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.description.split('！')[0]}
                      </p>
                    </div>

                    {/* 機能説明エリア */}
                    <div className="grid grid-cols-3 gap-4">
                      {(item.preview.features || []).map((feature) => (
                        <div
                          key={feature.id}
                          className="bg-white rounded-lg p-4 text-center shadow-sm"
                        >
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl">{feature.icon}</span>
                          </div>
                          <h4 className="text-xs font-medium text-gray-900 mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resume風: 複雑なレイアウトでポートフォリオ機能を紹介 */}
                {item.preview.type === 'portfolio' &&
                  item.preview.portfolio && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      {/* ヘッダー部分 */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {item.preview.portfolio.title.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {item.preview.portfolio.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {item.preview.portfolio.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* メイン機能紹介グリッド */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* 左側: デバイスプレビュー */}
                        <div className="space-y-3">
                          {(item.preview.portfolio.sections || [])
                            .filter((section) => section.type === 'device')
                            .map((section) => (
                              <div
                                key={section.id}
                                className="bg-white rounded-lg p-3 border"
                              >
                                <div
                                  className={`${section.title.includes('デスクトップ') ? 'h-20' : 'h-16'} rounded mb-2 flex items-center justify-center ${
                                    section.gradient
                                      ? `bg-gradient-to-r ${section.gradient}`
                                      : 'bg-blue-500'
                                  }`}
                                >
                                  <span className="text-white text-xs">
                                    {section.icon} {section.title}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600">
                                  {section.description}
                                </p>
                              </div>
                            ))}
                        </div>

                        {/* 右側: 機能説明 */}
                        <div className="space-y-3">
                          {(item.preview.portfolio.sections || [])
                            .filter((section) => section.type === 'feature')
                            .map((section) => (
                              <div
                                key={section.id}
                                className="bg-white rounded-lg p-3 border"
                              >
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-blue-500">
                                    {section.icon}
                                  </span>
                                  <span className="text-xs font-medium">
                                    {section.title}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600">
                                  {section.description}
                                </p>
                              </div>
                            ))}

                          {(item.preview.portfolio.sections || [])
                            .filter((section) => section.type === 'description')
                            .map((section) => (
                              <div
                                key={section.id}
                                className="bg-white rounded-lg p-3 border"
                              >
                                <p className="text-xs text-gray-700 leading-relaxed">
                                  {section.description}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                {/* OGPカード形式 */}
                {item.preview.type === 'ogp' && item.preview.ogp && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.preview.ogp.image ? (
                            <img
                              src={item.preview.ogp.image}
                              alt={item.preview.ogp.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-gray-400 text-2xl">🖼️</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">
                          {item.preview.ogp.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {item.preview.ogp.description}
                        </p>
                        <p className="text-xs text-blue-500 truncate">
                          {item.preview.ogp.url}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 画像表示 */}
                {item.preview.type === 'image' && item.preview.image && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <img
                      src={item.preview.image}
                      alt={item.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}

            {item.url && (
              <div className="mb-3">
                <span className="text-yellow-600">👑</span>
                <span className="text-blue-500 text-sm ml-1">{item.url}</span>
              </div>
            )}

            {/* Release Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>11:37 · {item.date}</span>
              <div className="flex items-center space-x-1">
                <span className="text-pink-500">♥</span>
                <span>{item.metrics?.likes?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
