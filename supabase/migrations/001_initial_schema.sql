-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ユーザープロフィールテーブル
-- Supabase Authのauth.usersと連携する
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 体調記録テーブル
create table public.records (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  recorded_at date not null default current_date,
  -- 気分: 1(とても悪い) 〜 5(とても良い)
  mood smallint not null check (mood between 1 and 5),
  -- 体調: 1(とても悪い) 〜 5(とても良い)
  condition smallint not null check (condition between 1 and 5),
  -- PMSの症状（複数選択）
  symptoms text[] not null default '{}',
  memo text,
  created_at timestamptz not null default now(),
  -- 同じ日に複数記録を防ぐ
  unique (user_id, recorded_at)
);

-- インデックス
create index records_user_id_idx on public.records(user_id);
create index records_recorded_at_idx on public.records(recorded_at desc);

-- updated_atを自動更新するトリガー関数
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_updated_at
  before update on public.users
  for each row execute procedure public.handle_updated_at();

-- 新規ユーザー登録時にusersテーブルへ自動挿入するトリガー
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row Level Security (RLS) を有効化
alter table public.users enable row level security;
alter table public.records enable row level security;

-- users テーブルのRLSポリシー
create policy "ユーザーは自分のプロフィールのみ参照可能"
  on public.users for select
  using (auth.uid() = id);

create policy "ユーザーは自分のプロフィールのみ更新可能"
  on public.users for update
  using (auth.uid() = id);

-- records テーブルのRLSポリシー
create policy "ユーザーは自分の記録のみ参照可能"
  on public.records for select
  using (auth.uid() = user_id);

create policy "ユーザーは自分の記録のみ作成可能"
  on public.records for insert
  with check (auth.uid() = user_id);

create policy "ユーザーは自分の記録のみ更新可能"
  on public.records for update
  using (auth.uid() = user_id);

create policy "ユーザーは自分の記録のみ削除可能"
  on public.records for delete
  using (auth.uid() = user_id);
