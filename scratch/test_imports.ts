import {
    Copy, Check, ExternalLink, Eye, X, Globe,
    ChevronRight, Layout, Download,
    Image as ImageIcon, Upload, Sparkles, Search,
    ArrowRight, Languages, Link2, TrendingUp, Rocket, Play,
    Pencil, Plus, BarChart3, Shield, Zap, Briefcase, Cpu, Coins, Crown, Sparkle, FileText
} from 'lucide-react';

const icons = { Copy, Check, ExternalLink, Eye, X, Globe, ChevronRight, Layout, Download, ImageIcon, Upload, Sparkles, Search, ArrowRight, Languages, Link2, TrendingUp, Rocket, Play, Pencil, Plus, BarChart3, Shield, Zap, Briefcase, Cpu, Coins, Crown, Sparkle, FileText };

Object.entries(icons).forEach(([k, v]) => {
    if (v === undefined) console.log(`Icon ${k} is undefined!`);
});
console.log("Checked all icons.");
