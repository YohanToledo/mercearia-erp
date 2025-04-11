import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable, of, tap } from 'rxjs'

interface ICacheValue {
  data: any
  expire: number
}

export class CacheInterceptor implements NestInterceptor {
  private cache: { [key: string]: ICacheValue } = {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      this.clearCache(request)
      return next.handle()
    }

    const cacheKey = this.generateCacheKey(request, request.user.sub)

    if (this.cache[cacheKey] && this.cache[cacheKey].expire > Date.now()) {
      return of(this.cache[cacheKey].data)
    }

    return next.handle().pipe(
      tap((data) => {
        this.cache[cacheKey] = {
          data,
          expire: Date.now() + 10 * 60 * 1000, // 10 minutes
        }
      }),
    )
  }

  private generateCacheKey(request: any, userId: string) {
    const urlBase = this.normalizeUrl(request.url)
    return `${urlBase}-${userId}-${request.method}`
  }

  private clearCache(request: any) {
    const urlBase = this.normalizeUrl(request.url)
    Object.keys(this.cache).forEach((key) => {
      if (key.startsWith(urlBase)) {
        delete this.cache[key]
      }
    })
  }

  private normalizeUrl(url: string) {
    return url.split('?')?.[0]?.replace(/\/[0-9a-fA-F]{24}$/, '')
  }
}
